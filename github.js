var git = (
	function()
	{
		return {

			getUrl: function(u, call,error)
			{
				var xhr = new XMLHttpRequest();
				xhr.open('GET', u, true);

				xhr.responseType = 'text';

				xhr.onload = function () {
					if (xhr.readyState === xhr.DONE) {
						if (xhr.status === 200) {
							//console.log(xhr.response);
							//console.log(xhr.responseText);
							call(xhr.responseText);
						}
						else if(error)
						{
							error(xhr.responseText);
						}
					}
				};

				xhr.send(null);
			},
			repos: function(user, call, error)
			{
				this.getUrl(`https://api.github.com/users/${user}/repos`, call, error);
			},
			repo: function(user, repo, dir, call, error)
			{
				if(name != undefined)
				{ 
					_repo = name;
				}
				this.getUrl(`https://api.github.com/repos/${user}/${repo}/contents${dir}`, call, error);
			},
			rawFile: function(user, repo, path, call, error)
			{
				//https://raw.githubusercontent.com/firefox257/incode/master/code_edit.js
				
				var d = new Date();
				var n = d.getTime();
				
				this.getUrl(`https://raw.githubusercontent.com/${user}/${repo}/master/${path}?unique=${n}`, call, error);
			},
			getFile:  function(user, repo, path, call, error)
			{
				this.getUrl(`https://api.github.com/repos/${user}/${repo}/contents/${path}?ref=master`, call, error);
			},
			commit: function(msg, token, user, repo, path, content, sha, call, error)
			{
				var xhr = new XMLHttpRequest();
				
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4 ){
						if(xhr.status == 200 || xhr.status == 201) {
							call(xhr.responseText);
						}
						else if(error)
						{
							error(xhr.responseText);
						}
					}
				}
				xhr.open("PUT", `https://api.github.com/repos/${user}/${repo}/contents/${path}`, true);
				xhr.setRequestHeader("Accept", "application/vnd.github.v3+json");
				xhr.setRequestHeader("Authorization", `token ${token}`);

				var dto ={
					message: msg,
					content: btoa(content),
					path: path,
					branch: "master"
				};
				if(sha != undefined)
				{
					dto.sha=sha;
				}

				xhr.send(JSON.stringify(dto));
			}

			
		};
	}
)();
