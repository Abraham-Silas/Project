<?php
  class DB{
    // Settings
    public $host = "localhost";
    public $connection = null;
    public $user = null;
    public $password = null;
    public $database = null;

    public function __construct() 
    {
        if($_SERVER['HTTP_HOST'] == "localhost"){
            // Local
            $this->user = "root";
            $this->password = "";
            $this->database = "curve";
        }
        else{
            // Remote
            $this->user = "u15231748";
            $this->password = "cxgnxdbk";
            $this->database = "db$this->user";
        }

        try{
            $this->connection = new Mysqli($this->host, $this->user, $this->password, $this->database);
            if(mysqli_connect_errno())
                throw new Exception();
        }
        catch(Exception $err){
            header("Location: http://$_SERVER[HTTP_HOST]/".Settings::getRoot()."/".Settings::getBase()."/curve/components/errors/connection.html");
        }
    }

    public function connectionObject(){
        return $this->connection;
    }

    public static function _instance(){
        static $instance = null;
        if($instance == null)
        {
            $instance = new DB();
            return $instance->connectionObject();
        }
        else
            return $instance->connectionObject();
    }
  }

  class Settings{
    public function backUpBundle(){
        if($_SERVER["HTTP_HOST"] == "localhost")
        {
            echo '<link href="http://'.$_SERVER["HTTP_HOST"].'/'.Settings::getRoot().'/'.Settings::getBase().'/curve/lib/fontawesome/css/all.css" rel="stylesheet">
                  <script src="http://'.$_SERVER["HTTP_HOST"].'/'.Settings::getRoot().'/'.Settings::getBase().'/curve/lib/jquery-3.5.1.js"></script>
                  <link rel="stylesheet" href="http://'.$_SERVER["HTTP_HOST"].'/'.Settings::getRoot().'/'.Settings::getBase().'/curve/lib/bootstrap-4/css/bootstrap.css"/>
                  <script src="http://'.$_SERVER["HTTP_HOST"].'/'.Settings::getRoot().'/'.Settings::getBase().'/curve/lib/bootstrap-4/js/bootstrap.bundle.js"></script>
                  <script src="http://'.$_SERVER["HTTP_HOST"].'/'.Settings::getRoot().'/'.Settings::getBase().'/curve/lib/bootstrap-4/js/bootstrap.js"></script>';
            Settings::css_Selection();
        }
    else{ /*Fall back into nothing*/ }
    }

    public function remoteBundle(){
        echo '<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.css">
              <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
              <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.js"></script>
              <script src="https://kit.fontawesome.com/a076d05399.js"></script>';
        Settings::css_Selection();
    }

    public function css_Selection(){
        echo '<script>
                if(window.location.pathname.split("/")[3].length > 0)
                    document.write(`<link rel="stylesheet" type="text/css" href="${window.location.origin}/${window.location.pathname.split("/")[1]}/${window.location.pathname.split("/")[2]}/curve/css/home_style.css">`);
                else
                    document.write(`<link rel="stylesheet" type="text/css" href="${window.location.origin}/${window.location.pathname.split("/")[1]}/${window.location.pathname.split("/")[2]}/curve/css/splash_style.css">`);
              </script>';
        echo '<link rel="icon" href="http://'.$_SERVER["HTTP_HOST"].'/'.Settings::getRoot().'/'.Settings::getBase().'/curve/images/logo/curve__.png">';
    }

    public function getRoot(){
        return basename(dirname(dirname(dirname(dirname(__FILE__)))));
    }

    public function getBase(){
        return basename(dirname(dirname(dirname(__FILE__))));
    }

    public function getHome(){
        return basename(dirname(__DIR__));
    }
  }

  $connection = DB::_instance();
?>