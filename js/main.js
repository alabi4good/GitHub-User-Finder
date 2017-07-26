$(function() {
    $('#search').keypress(function(e) {
        let username = e.target.value;
        
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            method: 'GET',
            data: {
                client_id: 'ca956b864f6e8de50909',
                client_secret: 'b6c64339319c19745a91871f0b9e9742c7a955fb'
            }
            
        }).done(function(user) {
            
            $.ajax({
                url: 'https://api.github.com/users/' +username+ '/repos',
                method: 'GET',
                data: {
                    client_id: 'ca956b864f6e8de50909',
                    client_secret: 'b6c64339319c19745a91871f0b9e9742c7a955fb',
                    sort: 'created: asc',
                    per_page: 6
                }
                
               }).done(function(repos) {
                  $.each(repos, function(index, repo) {
                      $('#repos').append(`
                        <div class="well">
                          <div class="row">
                            <div class="col-md-7">
                                <strong style="color:black;">${repo.name}: ${repo.description}</strong>
                            </div>
                            <div class="col-md-3">
                                <span class="label label-success">forks: ${repo.forks_count}</span>
                                <span class="label label-info">watcher: ${repo.watchers_count}</span>
                                <span class="label label-warning">stars: ${repo.stargazers_count}</span>
                            </div>
                            <div class="col-md-2">
                                <a href="${repo.html_url}" class="btn btn-default" target="_blank">View Repo</a>
                            </div>
                          </div>
                        </div>
                    `);
                  });
            });
            $('#profile').html(`
                <div class="panel panel-default">
                      <div class="panel-heading">
                         <h3 class="panel-title">Profile Name: ${user.name}</h3>
                      </div>
                      <div class="panel-body">
                         <div class="col-md-3">
                            <img src="${user.avatar_url}" class="avatar thumbnail">
                            <a href="${user.html_url}" target="_blank" class="btn btn-danger btn-lg avatar">View Profile</a>
                         </div>
                         <div class="col-md-9">
                            <span class="label label-default">Public Repos: ${user.public_repos}</span>
                            <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                            <span class="label label-success">Followers: ${user.followers}</span>
                            <span class="label label-info">Following: ${user.following}</span>
                            <br><br>
                            <ul class="list-group">
                                <li class="list-group-item">Company: ${user.company}</li>
                                <li class="list-group-item">Website/Blog: ${user.blog}</li>
                                <li class="list-group-item">Location: ${user.location}</li>
                                <li class="list-group-item">Member since: ${user.created_at}</li>
                            </ul>
                         </div>
                      </div>
                </div>
                <h3 class="page-header"> Latest Repos</h3>
                <div id="repos"></div>

            `);
        });
    });
    
});