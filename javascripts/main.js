$(function(){
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/users/k0kubun/repos?sort=created',
    cache: false,
    dataType: 'jsonp',
    success: function(data) {
      var datas, i, l, recentWork, recentWorks, desc;
      datas = data.data;
      recentWorks = $('ul.recent-works');

      l = datas.length;
      if (l > 10) {
        l = 10;
      }

      for (i = 0; i < l; i++) {
        data = datas[i];
        recentWork = $('<li class="work"><a class="url"></a><span class="desc" /></li>');
        recentWork.find('a').attr('href', data.html_url).html(data.name);

        desc = (data.description || '')//.slice(0, 60);
        if (desc != (data.description || '')) {
          desc += '...';
        }
        if (desc.length > 0) {
          desc = '- ' + desc;
        }
        recentWork.find('.desc').text(desc);

        if (data.fork) {
          recentWork.addClass('fork');
        }

        if (data.language) {
          recentWork.addClass('lang-' + data.language.toLowerCase());
        }

        recentWorks.append(recentWork);
      }
    }
  });
});
