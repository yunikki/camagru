<!DOCTYPE html>
<html class="html">
<head>
	<meta charset="UTF-8">
  	<meta name="description" content="e-comerce">
  	<meta name="keywords" content="HTML,CSS,php">
  	<meta name="author" content="mpinson">
	<link rel="stylesheet" type="text/css" href="style.css">
	<script type="text/javascript" src="../index.js"></script>
	<title>Camagru.com</title>
</head>
<body>
	<div class="top">
		<a href="http://localhost:8080/index.php"><h1>Camagru.com</h1></a>

		<div class="content">

			
		
		</div>
	</div>
	<div class="content_montage">
		
			<div class=corpus2>
				<div  enctype="multipart/form-data">
					<div class="img_select">
						<img src="http://localhost:8080/img/cadre.png">
						<input type="checkbox" class="img[] img1" value="1" name="checkbox">
						<img src="http://localhost:8080/img/coeur.png">
						<input type="checkbox" class="img[] img2" value="2" name="checkbox">
						<img src="http://localhost:8080/img/Pizza.png">
						<input type="checkbox" class="img[] img3" value="3" name="checkbox">
					</div>
				<div class="img-photo">
					<div class="img_preview">
						<img src="http://localhost:8080/img/cadre.png" class="display_none" id="img_1">
						<img src="http://localhost:8080/img/coeur.png" class="display_none" id="img_2">
						<img src="http://localhost:8080/img/Pizza.png" class="display_none" id="img_3">
					</div>
					<video id="video" autoplay=""></video>
					<button id="startbutton" disabled>Prendre une photo</button>
					
							<input name="img1"  type="file" class="file_uplod">
							gif:<input class="check_gif" type="checkbox">
					<canvas id="canvas"></canvas>
					
				</div>
				<div style="height: 240px">
					
				</div>
				<div class="img-lasted">
					
				</div>
				</div>
			</div>
	</div>
	<footer>footer</footer>
</body>
</html>


