<!DOCTYPE html>
<html lang="en">
<head>
<link rel="shortcut icon" type="image/x-icon" href="img/smcicon.png" />
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<?php 
$url = $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
$pages = array( // Stricly follow item order
    'academic#gd1','academic#gd2','academic','admissions','community','contact',
    /* 'about_facilities' */'about_history','about_mottoseal','about_mvstatement','about_objectives','about_officials','about_philo','about');

function nav($array, $l){
    foreach ($array as $n) {
        if (strpos($l, $n)) return "$n";
    };
    return 'home';
}

require(nav($pages, $url) . ".php");
echo "<title>SMC | $title </title>";
?>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="css/global.css">
<link rel="stylesheet" href="css/navbar.css">

<?php 
foreach($styles as $s) echo "<link rel='stylesheet' href='$s'>";
?>

<script src="js/jquery.min.js"></script>
</head>
<body>
    <div id="l">
    <div id="loader-cont">
    <div id="loader">
        <div></div>
        <div></div>
        <div><div></div></div>
        <div><div></div></div>
    </div>
    </div>
    </div>
    <div id="header-div"><img id="header-img" src="img/header-art.png"></div>
    <div id="navbar">
        <div class="nav-item" id="smc">
            <span>Stella</span>
            <span style="font-family:magneto">Maris </span>
            <span>College</span>
        </div>
        <a class="nav-item main-link" href="/">Home</a>
        <div class="nav-item nav-dropdwn nav-drop1" title="See about overview">
            <a class="main-link" href="?about">About Us <i class="fa fa-caret-down"></i></a>
            <div class="dropdown-content" style="position: absolute;">
                <!-- <a class="list-item" href="?about_facilities">Campus Facilities</a> -->
                <a class="list-item" href="?about_history">History of Stella Maris College</a>
                <a class="list-item" href="?about_philo">Philosophy of the School</a>
                <a class="list-item" href="?about_objectives">Objectives of the School</a>
                <a class="list-item" href="?about_mvstatement">Mission & Vision</a>
                <a class="list-item" href="?about_officials">Faculty & Staff</a>
                <a class="list-item" href="?about_mottoseal">Motto & Seal</a></div>
            </div>
        <div class="nav-item nav-dropdwn nav-drop2" title="See academic overview">
            <a class="main-link" href="?academic">Academic <i class="fa fa-caret-down"></i></a>
            <div class="dropdown-content" style="position: absolute;">
                <a class="list-item" href="?academic#gd1">Programs Offered</a>
                <a class="list-item" href="?academic#gd2">Instructional Program</a>
            </div>
        </div>
        <a class="nav-item main-link" href="?admissions">Admissions</a>
        <div class="nav-item nav-dropdwn nav-drop3">
            <a class="main-link" href="?community">Community <i class="fa fa-caret-down"></i></a>
            <div class="dropdown-content" style="position: absolute;">
                <a class="list-item" href="?community">Stellan Corner</a>
                <a class="list-item" href="https://www.facebook.com/stellamariscollegequezoncity" target="_blank">Registrar's Office</a>
                <a class="list-item" href="https://www.facebook.com/smcqcguidanceoffice" target="_blank">Guidance Office</a>
                <a class="list-item" href="https://www.facebook.com/SmcLmc1955" target="_blank">Library Media Center</a>
                <a class="list-item" href="https://www.facebook.com/Franciscan-Missionaries-of-Mary-General-House-in-Rome-401429463286620" target="_blank">FMM - Rome</a>
                <!-- <a class="list-item" href="">FMM - PH</a> -->
                <a class="list-item" href="https://www.facebook.com/groups/thestellanconnection" target="_blank">Stellan Connection</a>
            </div>
        </div>
        <a class="nav-item main-link" href="?contact">Contact Us</a>
    </div>
    <div id="mobilenav">
    <div style="text-align:center; color: white; padding: 10px;"><span>Stella </span><span style="font-family: magneto ">Maris </span><span>College</span></div>
    <div id="myLinks"></div>
    <a href="javascript:void(0);" class="icon" onclick="revealLinks()"><i class="fa fa-bars"></i></a>
    </div>    
    <?php echo $content; ?>
    <div class="footer">&nbsp</div>
    <button onclick="toTop()" id="toTop" title="Back to Top"><i class="fa fa-2x fa-arrow-up"></i></button>
</body>
<script src="js/loading.js"></script>
<script src='js/all.js'></script>

<?php 
if (is_array($scripts)) { 
    foreach($scripts as $s) echo "<script src='$s'></script>";
}
?>
</html>

