<head>
    <meta charset="utf-8">
    <meta name="author" content="Nhlamulo Maluleka">
    <?php    
        echo '<script>
                if(navigator.onLine){
                    '.Settings::remoteBundle().'
                }
                else{
                    '.Settings::backUpBundle().'
                }
            </script>';
    ?>   
</head>