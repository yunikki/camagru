function form_param(tab) {
	var str = "";
	for (var key in tab) {
  		str += key + "=" + tab[key] + "&";
	}
	return (str);
}

var full_img = {};
var page = 0;
var name_user;
var full_user;
var user;
var comment_by;
var gif = 0;
var count_gif = 0;
var tab_gif = [];

function escapeHtml(text) {
  var map = {
    '&': '',
    ':': '',
    '<': '',
    '>': '',
    '"': '',
    "'": ''
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function filtre_undefind(t) {
	tab = [];

	for (var i = 0; i < t.length; i++) {
		if(t[i] != undefined)
			tab.push(t[i])
	}
	return(tab)
}

function bind_article() {
	for (var i = 0; i < document.getElementsByClassName('article').length; i++) {
		document.getElementsByClassName('article')[i].addEventListener("click", function( event ){
			var id = event.target.id;
			var img = [];
			document.getElementsByClassName('corpus')[0].innerHTML = "";
			document.getElementsByClassName('oui')[0].innerHTML = "";

			for (var i = 0; i < full_img.length; i++) {
				if(full_img[i]['id'] == id)
				{
					img = full_img[i];
				}
			} 
			var html = `<div class=page_produit>
							<img src='http://localhost:8080/img/`+img['path']+`' class='img_produit'><br>`


			
			if(name_user)
			{
				var liked_by = JSON.parse( img['likedby'])
				var is_enter = 0;
				var index = -1
				for (var i = 0; i < liked_by.length; i++) {
					if(liked_by[i] == user[0].id)
					{
						is_enter = 1;
						index = i
					}
				}
				var like = 0;
				if(is_enter == 0)
				{
					html += `like :<input type='checkbox' id='coding' name='interest' class=ckeck_like> `;
				}
				else
				{
					html+=`like :<input type='checkbox' id='coding' name='interest' checked  class='ckeck_like'>` 
					like = 1;
				}
				if(user[0].id == img['creat_by'])
				{
					html+="delete : <input type='button' name='' class='del_img'>"
				}

			}
			html += `partage : <img src="https://www.techrevolutions.fr/wp-content/plugins/social-media-widget/images/default/32/facebook.png" alt="Facebook share" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=`+encodeURIComponent(`http://www.localhost:8080/img/` + img['path']) + `', 'facebook_share', 'height=320, width=640, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no');">`


			html += "</div>"

			comment_by = JSON.parse( img['commentby'])


			for (var i = 0; i < comment_by['comments'].length; i++) {
				html += `<div class=comment>
				<h4>comment by : `+comment_by['comments'][i]['login']+`</h4>
				<p>`+escapeHtml(comment_by['comments'][i]['commante'])+`</p>
				<hr></div>`
			}

			if(name_user)
			html += `<form class="form-comment">
					<input type="text" name="" class="input-comment">
					<input type="button" name="" class="input-button">
				</form>`
			document.getElementsByClassName('corpus')[0].innerHTML = html;

			if(document.getElementsByClassName('del_img')[0])
			document.getElementsByClassName('del_img')[0].addEventListener("click", function( event ) {
				var tab = [];
				tab['img_id'] = img['id']
				call_del_img("http://localhost:8080/back/del_img.php", tab)
			})





			if(document.getElementsByClassName('input-button')[0])
			document.getElementsByClassName('input-button')[0].addEventListener("click", function( event ) {
				var tab = {};
				tab['login'] = name_user;
				tab['commante'] = escapeHtml(document.getElementsByClassName('input-comment')[0].value)

				comment_by['comments'].push(tab);
				str = JSON.stringify(comment_by['comments'])
				str = "{" + '"comments"' + ":" + str + "}"
				tab = [];
				tab['str'] = str
				tab['id'] = img.id
				call_add_comment("http://localhost:8080/back/add_comment.php", tab, name_user, document.getElementsByClassName('input-comment')[0].value)
			})
		

		
			if(document.getElementsByClassName('ckeck_like')[0])
				document.getElementsByClassName('ckeck_like')[0].addEventListener("change", function( event ) {

					for (var i = 0; i < liked_by.length; i++) {
						if(liked_by[i] == user[0].id)
						{
							is_enter = 1;
							index = i
						}
					}
						if(like == 1)
						{
							delete liked_by[index];
							liked_by = filtre_undefind(liked_by);
						}
						else
						{
							liked_by.push(user[0].id);
						}
						var tab = [];
						tab['id'] = img.id
						tab['str'] = JSON.stringify(liked_by)
						call_like("http://localhost:8080/back/like.php", tab)
						like == 1 ? like = 0 : like = 1;

				})
			
		});

	}
	
}

function call_like(url, tab)
{
	var http = new XMLHttpRequest();
	var params = form_param(tab);
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) {  
	    }
	}
	http.send(params);
	return(http.responseText);
}

function call_mont_gif(url, tab) {
	var http = new XMLHttpRequest();
	var params = tab;
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) {
	    }
	}
	http.send(params);
	return(http.responseText);
}

function call_save_img(url, tab)
{
	var http = new XMLHttpRequest();
	var params = form_param(tab);
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) {
	        if(gif == 1)
		    {
		    	count_gif++;
		    	tab_gif.push(http.responseText);
		    	if(count_gif == 5)
		    	{
		    		var str = "img1=" + tab_gif[0] + "&" + "img2=" + tab_gif[1] + "&" + "img3=" + tab_gif[2] + "&" + "img4=" + tab_gif[3] + "&" + "img5=" + tab_gif[4]
		    		call_mont_gif('http://localhost:8080/back/mont_gif.php', str);
		    		tab_gif = [];
		    		count_gif = 0;
		    	}
		    }
	       
	    }
	}
	http.send(params);
	return(http.responseText);
}

function call_add_comment(url, tab, login, comment) {
	var http = new XMLHttpRequest();
	var params = form_param(tab);
	http.open("POST", url, true);
	comment = escapeHtml(comment);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) {
	        var rep = JSON.parse(http.responseText);
	        document.location.href = "http://localhost:8080/index.php"
	        document.getElementsByClassName('form-comment')[0].remove();
	        var html = ""
			
				html += `<div class=comment>
				<h4>comment by : `+login+`</h4>
				<p>`+comment+`</p>
				<hr></div>`
			if(name_user)
			html += `<form class="form-comment">
					<input type="text" name="" class="input-comment">
					<input type="button" name="" class="input-button">
				</form>`
				document.getElementsByClassName('corpus')[0].innerHTML += html;
			if(document.getElementsByClassName('input-button')[0])
			document.getElementsByClassName('input-button')[0].addEventListener("click", function( event ) {
				var tab = {};
				tab['login'] = name_user;
				tab['commante'] = escapeHtml(document.getElementsByClassName('input-comment')[0].value)
				comment_by['comments'].push(tab);
				str = JSON.stringify(comment_by['comments'])
				str = "{" + '"comments"' + ":" + str + "}"
				tab = [];
				tab['str'] = str
				tab['id'] = img.id
				call_add_comment("http://localhost:8080/back/add_comment.php", tab, name_user, document.getElementsByClassName('input-comment')[0].value)
			})

	        
	    }
	}
	http.send(params);
	return(http.responseText);
}

function call_img(tab, url) {
	var http = new XMLHttpRequest();
	var params = form_param(tab);
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) {
	        
	        var img = JSON.parse(http.responseText);

	        img = img.result.img;
	        full_img = img;
	        var html = ""
	        var length = img.length > 5 ? 5 : img.length
	        for (var i = 0; i < length; i++) {
				html += "<div class=article id="+img[i]['id']+"><img src='img/" + img[i]['path'] + "' id="+img[i]['id']+"><a href='#' class=article_title id="+img[i]['id']+">"+img[i]['path']+"</a><br></div>"
	        }
	        if(document.getElementsByClassName('corpus')[0])
	        	document.getElementsByClassName('corpus')[0].innerHTML = html;

	         if(document.getElementsByClassName('corpus')[0])
	        document.getElementsByClassName('flech_droit')[0].addEventListener("click", function( event ) {
	        	if(!img[(page + 1) * 5])
	        		return;
				document.getElementsByClassName('corpus')[0].innerHTML = "";
				html = "";
				page++;
				for (var i = page * 5; i < (page + 1) * 5; i++) {
					if(img[i])
					{
						html += "<div class=article id="+img[i]['id']+"><img src='img/" + img[i]['path'] + "' id="+img[i]['id']+"><a href='#' class=article_title id="+img[i]['id']+">"+img[i]['path']+"</a><br></div>"
					}
				}
				document.getElementsByClassName('corpus')[0].innerHTML = html;
				bind_article();
			});

	    	 if(document.getElementsByClassName('flech_gauche')[0])
			document.getElementsByClassName('flech_gauche')[0].addEventListener("click", function( event ) {
				if(page <= 0)
					return;
				document.getElementsByClassName('corpus')[0].innerHTML = "";
				html = "";
				page--;
				for (var i = page * 5; i < (page + 1) * 5; i++) {
					if(img[i])
					{
						html += "<div class=article id="+img[i]['id']+"><img src='img/" + img[i]['path'] + "' id="+img[i]['id']+"><a href='#' class=article_title id="+img[i]['id']+">"+img[i]['path']+"</a><br></div>"
					}
				}
				document.getElementsByClassName('corpus')[0].innerHTML = html;
				bind_article();
			});
			bind_article();
	        
	    }
	}
	http.send(params);
	return(http.responseText);
}

function call_del_img(url,tab) {
	var http = new XMLHttpRequest();
	var params = form_param(tab);
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) {
	        document.location.href = "http://localhost:8080/index.php"
	    }
	}
	http.send(params);
	return(http.responseText);
}



function call_users(tab, url) {
	var http = new XMLHttpRequest();
	var params = form_param(tab);
	http.open("POST", url, true);

	
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) {
	        
	        var img = JSON.parse(http.responseText);
	        name_user = img['loged'];
	        img = img.result.user;

	        full_user = img;

	        tab = [];
	        tab['login'] = name_user;
	        call_user(tab, "http://localhost:8080/back/aff_user.php");

	        
	    }
	}
	http.send(params);
	return(http.responseText);
}

function call_check_mail(url, tab) {
	var http = new XMLHttpRequest();
	var params = form_param(tab);
	http.open("POST", url, true);

	
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) {
	        
	        var img = http.responseText;
	       	user[0].mail == "1" ? user[0].mail = "0" : user[0].mail = "1";

	        
	    }
	}
	http.send(params);
	return(http.responseText);
}

function call_user(tab, url) {
	var http = new XMLHttpRequest();
	var params = form_param(tab);
	http.open("POST", url, true);

	
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) {
	        
	        var img = JSON.parse(http.responseText);
	        name_user = img['loged'];
	        img = img.result.user;

	        user = img;

	        if(document.getElementsByClassName('param-checkbox')[0])
	        {
	        	if(user[0].mail == "1")
	        		document.getElementsByClassName('param-checkbox')[0].innerHTML = "resevoir un mail quand un commentaire est poser <input type='checkbox' name='' class='param_ch' checked>"
	        	else
	        		document.getElementsByClassName('param-checkbox')[0].innerHTML = "resevoir un mail quand un commentaire est poser <input type='checkbox' name='' class='param_ch'>"

	        	document.getElementsByClassName('param_ch')[0].addEventListener("change", function( event ) {
	        		var tab = [];
	        		tab['check'] = user[0].mail
	        		call_check_mail("http://localhost:8080/back/check_mail.php", tab)
	        	})
	        }
	        
	        
	    }
	}
	http.send(params);
	return(http.responseText);
}

function get_img() {
	var elem = document.getElementsByClassName('text_in');
	var tab = [];

	tab['value'] = elem[0].value
	
	call_post(tab, "http://localhost:8080/back/test.php");
}

var elem = document.getElementsByClassName('corpus');


	var img = call_img([], "http://localhost:8080/back/get_img.php");
	var tab = [];
	call_users(tab, "http://localhost:8080/back/aff_user.php");
	




function call_newpass(url, tab) {
	var http = new XMLHttpRequest();
	var params = form_param(tab);
	http.open("POST", url, true);

	
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) {
	        
	    }

	}
	http.send(params);
	return(http.responseText);
}

function call_newemail(url, tab) {
	var http = new XMLHttpRequest();
	var params = form_param(tab);
	http.open("POST", url, true);

	
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) {
	        
	       var img = JSON.parse(http.responseText);
	        
	    }
	}
	http.send(params);
	return(http.responseText);
}

function call_newlogin(url, tab) {
	var http = new XMLHttpRequest();
	var params = form_param(tab);
	http.open("POST", url, true);

	
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) {
	        
	        
	    }
	}
	http.send(params);
	return(http.responseText);
}


function call_btn_uplod_img(url, tab) {
	var http = new XMLHttpRequest();
	var params = tab;
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) { 
	    }
	}
	http.send(params);
	return(http.responseText);
}

function call_btn_reset_img(url, tab) {
	var http = new XMLHttpRequest();
	var params = form_param(tab);
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) {
	        document.location.href = "http://localhost:8080/index.php"
	    }
	}
	http.send(params);
	return(http.responseText);
}

function call_logout(url, tab) {
	var http = new XMLHttpRequest();
	var params = form_param(tab);
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) {
	        document.location.href = "http://localhost:8080/index.php"
	    }
	}
	http.send(params);
	return(http.responseText);
}

function call_creat_account(url, tab) {
	var http = new XMLHttpRequest();
	var params = form_param(tab);
	http.open("POST", url, true);

	
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) {
	        document.location.href = "http://localhost:8080/index.php"
	    }
	}
	http.send(params);
	return(http.responseText);
}

function call_login(url, tab) {
	var http = new XMLHttpRequest();
	var params = form_param(tab);
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) {
	       var img = JSON.parse(http.responseText);
	       if(img['msg'] != "error")
	       	document.location.href = "http://localhost:8080/index.php"
	        
	    }
	}
	http.send(params);
	return(http.responseText);
}

function call_img_lasted(url, tab) {
	var http = new XMLHttpRequest();
	var params = form_param(tab);
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) {
	        var img = JSON.parse(http.responseText);
	        var i = 0;
	        var html = "";
	        while (i < 5)
	        {
	        	if(img['result'][i])
	        	html += "<img height=240px src='http://localhost:8080/img/" + img['result'][i]['path'] + "'>"
	        	i++;
	        }
	        document.getElementsByClassName('img-lasted')[0].innerHTML = html;
	    }
	}
	http.send(params);
	return(http.responseText);
}


function get_logged(url, tab) {
	var http = new XMLHttpRequest();
	var params = form_param(tab);
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) {
			var file = document.location.href.substring(document.location.href.lastIndexOf( "/" )+1 );
	        if(http.responseText == "")
	        {
	        	if(document.getElementsByClassName('content')[0])
	        	document.getElementsByClassName('content')[0].innerHTML = "<div class=connection>\n<a href='http://localhost:8080/html/login.php'>login</a>\n</div>\n<div class='creat'>\n<a href='http://localhost:8080/html/creat.php'>creat acount</a>\n</div>\n";
	        	if(file == "montage.php"|| file == "param.php")
	        		document.location.href = "http://localhost:8080/index.php"
	        }
	        else
	        {
	        	if(document.getElementsByClassName('content')[0])
	        	document.getElementsByClassName('content')[0].innerHTML = "<div class=btn_param>\n<a href='http://localhost:8080/html/param.php'>param</a>\n</div>       <div class=connection>\n<a href='http://localhost:8080/html/montage.php'>montage</a>\n</div>\n<div class='creat'>\n<a class=logout>logout</a>\n</div>\n";
	        	if(file == "creat.php"|| file == "login.php")
	        		document.location.href = "http://localhost:8080/index.php"
	        }

	        if(document.getElementsByClassName('logout')[0])
			document.getElementsByClassName('logout')[0].addEventListener("click", function( event ) {
				var tab = [];
				call_logout("http://localhost:8080/html/logout.php", tab);
			})
	    }
	}
	http.send(params);
	return(http.responseText);
}
var img_select = 0;
setTimeout(function() {
	if(document.getElementsByClassName('param-btn-mdp')[0])
		document.getElementsByClassName('param-btn-mdp')[0].addEventListener("click", function( event ) {
			var tab = [];
			tab['passwd'] = document.getElementsByClassName('param-new-pass')[0].value
			tab['oldpasswd'] = document.getElementsByClassName('param-mdp')[0].value
			call_newpass("http://localhost:8080/back/new_passwd.php", tab);
		})

	if(document.getElementsByClassName('param-btn-mail')[0])
		document.getElementsByClassName('param-btn-mail')[0].addEventListener("click", function( event ) {
			var tab = [];
			tab['email'] = document.getElementsByClassName('param-new-mail')[0].value
			call_newemail("http://localhost:8080/back/reset_email.php", tab);
		})


	if(document.getElementsByClassName('param-btn-login')[0])
		document.getElementsByClassName('param-btn-login')[0].addEventListener("click", function( event ) {
			var tab = [];
			tab['login'] = document.getElementsByClassName('param-new-login')[0].value
			call_newlogin("http://localhost:8080/back/reset_login.php", tab);
		})


	if(document.getElementsByClassName('file_uplod')[0])
		document.getElementsByClassName('file_uplod')[0].addEventListener("click", function( event ) {
			var tab = [];
			var fileInput = document.getElementsByClassName('file_uplod')[0];
			    fileInput.addEventListener('change', function() {
			        var reader = new FileReader();
			        reader.addEventListener('load', function() {
			        	tab['img1'] = reader.result;
					    tab['checkbox'] = img_select;
					    tab['gif'] = gif;
					    if(img_select != 0)
    						call_save_img("http://localhost:8080/back/save_img.php", tab);
			        });
			        reader.readAsDataURL(fileInput.files[0]);
			    });
		})

	if(document.getElementsByClassName('btn_reset_mdp')[0])
		document.getElementsByClassName('btn_reset_mdp')[0].addEventListener("click", function( event ) {
			var tab = [];
			tab['login'] = document.getElementsByClassName('in_reset_mdp')[0].value
			call_btn_reset_img("http://localhost:8080/back/reset_mdp.php", tab)
		})

	if(document.getElementsByClassName('img1')[0])
		document.getElementsByClassName('img1')[0].addEventListener("click", function( event ) {
			document.getElementsByClassName('img2')[0].checked = false;
			document.getElementsByClassName('img3')[0].checked = false;
			img_select == 1 ? img_select = 0:img_select = 1;
			if(img_select == 1)
			{
				document.getElementById("img_1").className = "display_block"
				document.getElementById("img_2").className = "display_none"
				document.getElementById("img_3").className = "display_none"
				document.getElementById("startbutton").disabled = false;
				document.getElementsByClassName('btn_uplod_img')[0].disabled = false;
			}
			else
			{
				document.getElementById("img_1").className = "display_none"
				document.getElementById("img_2").className = "display_none"
				document.getElementById("img_3").className = "display_none"
				document.getElementById("startbutton").disabled = true;
				document.getElementsByClassName('btn_uplod_img')[0].disabled = true;
			}
		})

	if(document.getElementsByClassName('img2')[0])
		document.getElementsByClassName('img2')[0].addEventListener("click", function( event ) {
			document.getElementsByClassName('img1')[0].checked = false;
			document.getElementsByClassName('img3')[0].checked = false;
			img_select == 2 ? img_select = 0:img_select = 2;
			if(img_select == 2)
			{
				document.getElementById("img_2").className = "display_block"
				document.getElementById("img_1").className = "display_none"
				document.getElementById("img_3").className = "display_none"
				document.getElementById("startbutton").disabled = false;
	
			}
			else
			{
				document.getElementById("img_1").className = "display_none"
				document.getElementById("img_2").className = "display_none"
				document.getElementById("img_3").className = "display_none"
				document.getElementById("startbutton").disabled = true;
			
			}
		})

	if(document.getElementsByClassName('img3')[0])
		document.getElementsByClassName('img3')[0].addEventListener("click", function( event ) {
			document.getElementsByClassName('img1')[0].checked = false;
			document.getElementsByClassName('img2')[0].checked = false;
			img_select == 3 ? img_select = 0:img_select = 3;
			if(img_select == 3)
			{
				document.getElementById("img_3").className = "display_block"
				document.getElementById("img_2").className = "display_none"
				document.getElementById("img_1").className = "display_none"
				document.getElementById("startbutton").disabled = false;
				document.getElementsByClassName('btn_uplod_img')[0].disabled = false;
			}
			else
			{
				document.getElementById("img_1").className = "display_none"
				document.getElementById("img_2").className = "display_none"
				document.getElementById("img_3").className = "display_none"
				document.getElementById("startbutton").disabled = true;
				document.getElementsByClassName('btn_uplod_img')[0].disabled = true;
			}
		})

	if(document.getElementsByClassName('creat_account_btn')[0])
		document.getElementsByClassName('creat_account_btn')[0].addEventListener("click", function( event ) {
			var tab = [];
			tab['login'] = document.getElementsByClassName('creat_account_id')[0].value;
			tab['passwd'] = document.getElementsByClassName('creat_account_mdp')[0].value;
			tab['email'] = document.getElementsByClassName('creat_account_mail')[0].value;
			call_creat_account("http://localhost:8080/back/verif_add_user.php", tab);
		})


	if(document.getElementsByClassName('btn_log')[0])
		document.getElementsByClassName('btn_log')[0].addEventListener("click", function( event ) {
			var tab = [];
			tab['login'] = document.getElementsByClassName('in_id_log')[0].value;
			tab['passwd'] = document.getElementsByClassName('in_mdp_log')[0].value;
			call_login("http://localhost:8080/back/log.php", tab);
		})

	if(document.getElementsByClassName('check_gif')[0])
		document.getElementsByClassName('check_gif')[0].addEventListener("click", function( event ) {
			gif == 1 ? gif = 0 : gif = 1;
		})

	if(document.getElementsByClassName('img-lasted')[0])
		{
			tab = [];
			call_img_lasted("http://localhost:8080/back/img_lasted.php", tab);
		}

	get_logged("http://localhost:8080/back/get_logged.php",[]);

	if(document.getElementById('video'))
	{
		video();
	}
	if(document.getElementsByClassName('img2')[0])
	{
		document.getElementsByClassName('img2')[0].checked = false;
		document.getElementsByClassName('img3')[0].checked = false;
		document.getElementsByClassName('img1')[0].checked = false;
	}

},100);

function video() {

  var streaming = false,
      video        = document.querySelector('#video'),
      cover        = document.querySelector('#cover'),
      canvas       = document.querySelector('#canvas'),
      photo        = document.querySelector('#photo'),
      startbutton  = document.querySelector('#startbutton'),
      width = 500,
      height = 0;

  navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

if (navigator.getUserMedia) {
   navigator.getUserMedia({ audio: false, video: { width: 500, height: 375 } },
      function(stream) {
         var video = document.querySelector('#video');
         video.src = window.URL.createObjectURL(stream);
         video.onloadedmetadata = function(e) {
           video.play();
         };
      },
      function(err) {
        
      }
   );
} else {
   
}

  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);

  function takepicture() {
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL('image/png');
    var tab = [];
    tab['img1'] = data;
    tab['checkbox'] = img_select;
    tab['gif'] = gif;
    call_save_img("http://localhost:8080/back/save_img.php", tab);
  }

  startbutton.addEventListener('click', function(ev){
      takepicture();
    ev.preventDefault();
  }, false);
}

function call_add_g_acount(url, tab) {
	
	var http = new XMLHttpRequest();
	var params = form_param(tab);
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) {
	        document.location.href="http://localhost:8080/html/montage.php";
	    }
	}
	http.send(params);
	return(http.responseText);
}

function GoogleOnSuccess(googleUser) {
    var profile = googleUser.getBasicProfile();
    gapi.client.load('plus', 'v1', function () {
        var request = gapi.client.plus.people.get({
            'userId': 'me'
        });
        request.execute(function (resp) {
        	var tab = [];
        	tab['email'] = resp.emails[0].value;
        	tab['full_name'] = resp.displayName;
        	tab['id_g'] = resp.id;
            call_add_g_acount("http://localhost:8080/back/add_g_acount.php",tab)
        });
    });
}
function GoogleOnFailure(error) {
    console.error(error);
}
function GoogleRenderButton() {
    gapi.signin2.render('gSignIn', {
        'scope': 'profile email',
        'width': 50,
        'height': 50,
        'longtitle': false,
        'theme': 'dark',
        'onsuccess': GoogleOnSuccess,
        'onfailure': GoogleOnFailure
    });
}
function GooleSignOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        $('.userContent').html('');
        $('#gSignIn').slideDown('slow');
    });
}