<?php
header("Access-Control-Allow-Origin: *");


if (filter_input(INPUT_SERVER, 'SERVER_NAME', FILTER_SANITIZE_URL) == "192.168.0.102") {
    $servername = "localhost";
    //$servername = '192.168.0.102';
    $username = "root";
    $password = "";
    $dbname = "tunecaster";  
} else {
        //I'd like to keep this sort of private :-)

}

$data = ""; 

function executesql($sql){
    if($sql){
        global $servername, $username, $password, $dbname;
        
        $conn = new mysqli($servername, $username, $password, $dbname) or die ("failed");
        if($conn->connect_error){
            echo json_encode(["success" => false, "message" => "Connection Failed: ".$conn->connect_error]);
        }
        $result = $conn->query($sql);
        if(strpos($sql, "INSERT INTO")===0){
            $result = $conn->insert_id;
        }
        $conn->close();
        return $result;
    }
}
function randLetter(){
    $int = rand(0,25);
    $a_z = "abcdefghijklmnopqrstuvwxyz";
    $rand_letter = $a_z[$int];
    return $rand_letter;
}
function generatehostcode(){
    function generate(){
        return randLetter().randLetter().mt_rand(1000, 9999);
    }
    $i=0;
    $found = true;
    while($found && $i<100) {
        $code = generate();
        $sql = "SELECT DISTINCT id, hostname FROM tbl_host where hostcode = '$code';";
        $result = executesql($sql);
        $found = $result->fetch_assoc();
        if($i==99){
            //TODO:Log an alarm
            return;
        }
    }
    return $code;// $data;

}
function createhost($hostname) {
    $hostcode = generatehostcode();
    $sql = "INSERT INTO tbl_host (hostcode, hostname) values ('$hostcode', '$hostname');";
    $result = executesql($sql);
    if($result){
        return ["success" => true, "id"=> $result, "hostcode" => $hostcode, "message" => "Created!"];
    } else {
        return ["success" => false, "message" => "0 results - ".$sql."==="];
    }
}

function loadhost($hostcode) {
    $sql = "SELECT DISTINCT id, hostname FROM tbl_host where hostcode = '$hostcode';";
    $result = executesql($sql);
    if($result){
        $data = $result->fetch_assoc();
        return ["success" => true, "id"=> $result, "data" => $data, "message" => "Loaded!"];
    } else {
        return ["success" => false, "message" => "0 results - ".$sql."==="];
    }
}
function resetretrieved($hostid){
    $sql = "UPDATE tbl_song set retrieved ='0' where hostid = '$hostid'";
    $result = executesql($sql);
    if($result){
        $data = $result->fetch_assoc();
        $sql = "UPDATE tbl_msg set retrieved ='0' where hostid = '$hostid'";
        $result = executesql($sql);
        return ["success" => true, "data"=> $data, "message" => "All retrieved reset!"];
    } else {
        return ["success" => false, "message" => "0 results - ".$sql."==="];
    }
}
function getprelists(){
    $sql = "SELECT l.id as prelistid, l.name as prelistname, s.id as id, s.ytid as ytid, s.title as title FROM tbl_prelist as l LEFT JOIN tbl_presong as s ON l.id = s.prelistid ORDER by rand()";
    $result = executesql($sql);
    if($result){
        $data = $result->fetch_all(MYSQLI_ASSOC);
        return ["success" => true, "data"=> $data, "message" => "Here you have the prelists!"];
    } else {
        return ["success" => false, "message" => "0 results - ".$sql."==="];
    }
}
function getnewsongs($hostid){
    $sql = "SELECT id, hostid, ytid, title, skips, likes FROM tbl_song where hostid = '$hostid' AND retrieved = '0'";
    $result = executesql($sql);
    if($result){
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $sql = "UPDATE tbl_song set retrieved ='1' where hostid = '$hostid'";
        $result = executesql($sql);
        return ["success" => true, "data"=> $data, "message" => "New songs!"];
    } else {
        return ["success" => false, "message" => "0 results - ".$sql."==="];
    }
}
function sendmessage($hostid, $msg, $user){
    $sql = "INSERT INTO tbl_msg (msg, hostid, user) values ('$msg', '$hostid', '$user') ";
    $result = executesql($sql);
    if($result){
        return ["success" => true, "id"=> $result, "message" => "Message inserted!"];
    } else {
        return ["success" => false, "message" => "0 results - ".$sql."==="];
    }
}
function getmessages($hostid){
    $sql = "SELECT msg, user FROM tbl_msg where hostid = '$hostid' AND retrieved = '0'";
    $result = executesql($sql);
    if($result){
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $sql = "UPDATE tbl_msg set retrieved ='1' where hostid = '$hostid'";
        $result = executesql($sql);
        return ["success" => true, "data"=> $data, "message" => "New messages!"];
    } else {
        return ["success" => false, "message" => "0 results - ".$sql."==="];
    }
}
function addsong($hostid, $ytid, $title){
    $sql = "INSERT INTO tbl_song (hostid, ytid, title) values ('$hostid', '$ytid', '$title')";
    $result = executesql($sql);
    if($result){
        return ["success" => true, "id"=> $result, "message" => "Song added!"];
    } else {
        return ["success" => false, "message" => "0 results - ".$sql."==="];
    }
}
$method = isset($_GET['method']) ? $_GET['method'] : "";

switch($method){
    case "":
        echo json_encode(["sent" => false, "message" => "Recieved no method: "]);
    break;
    case "createhost":
        $hostname = isset($_GET['hostname']) ? $_GET['hostname'] : "0";
        echo json_encode(createhost($hostname));
    break;
    case "loadhost":
        $hostcode = isset($_GET['hostcode']) ? $_GET['hostcode'] : "0";
        echo json_encode(loadhost($hostcode));
    break;
    case "resetretrieved":
        $hostid = isset($_GET['hostid']) ? $_GET['hostid'] : "0";
        echo json_encode(resetretrieved($hostid));
    break;
    case "getprelists":
        echo json_encode(getprelists());
    break;
    case "getnewsongs":
        $hostid = isset($_GET['hostid']) ? $_GET['hostid'] : "0";
        echo json_encode(getnewsongs($hostid));
    break;
    case "addsong":
        $hostid = isset($_GET['hostid']) ? $_GET['hostid'] : "0";
        $ytid = isset($_GET['ytid']) ? $_GET['ytid'] : "0";
        $title = isset($_GET['title']) ? $_GET['title'] : "0";
        echo json_encode(addsong($hostid, $ytid, $title));
    break;
    case "sendmessage":
        $hostid = isset($_GET['hostid']) ? $_GET['hostid'] : "0";
        $msg = isset($_GET['msg']) ? $_GET['msg'] : "0";
        $user = isset($_GET['user']) ? $_GET['user'] : "0";
        if($hostid && $msg){
           echo json_encode(sendmessage($hostid, $msg, $user));
        }
    break;
    case "getmessages":
        $hostid = isset($_GET['hostid']) ? $_GET['hostid'] : "0";
        echo json_encode(getmessages($hostid));
    break;
    case "gen":
        echo generatehostcode();
    break;
}
?>