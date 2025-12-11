{
  'use strict';
  const opt = {
    optArticleSelector: '.post',
    optTitleSelector: '.post-title',
    optTitleListSelector: '.titles',
    optArticleTagsSelector: '.post-tags .list',
    optArticleAuthorSelector: '.post-author',
    optTagsListSelector: '.list.tags',
    optCloudClassCount: 5,
    optCloudClassPrefix: 'tag-size-',
    optAuthorListSelector: '.list.authors',
  };
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
  };

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(opt.optTitleListSelector + ' a.active');

    for(const activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');

    for(const activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const attributeClickedElement = clickedElement.getAttribute('href'),

      /* [DONE] find the correct article using the selector (value of 'href' attribute) */
      correctArticle = document.querySelector(attributeClickedElement);

    /* [DONE] add class 'active' to the correct article */
    correctArticle.classList.add('active');
  };

  const generateTitleLinks = function(customSelector = ''){
    /* [DONE] Delete the contents of the link list in the left column.*/
    document.querySelector('.list').innerHTML='';
    let allLinksHTML = '';
  
    const articles = document.querySelectorAll(opt.optArticleSelector + customSelector);

    for(const article of articles){

      /* [DONE] For each article, read its ID and save it to a constant.*/
      const articleId = article.getAttribute('id'),

        /* [DONE] For each article, find the title element and save its contents to a constant.*/
        articleTitle = article.querySelector(opt.optTitleSelector).textContent;

      /* [DONE] For each article, create the HTML link code based on this information and save it to a constant.*/
      const linkHTMLData = {id: articleId, title: articleTitle},
        articleHtmlLink = templates.articleLink(linkHTMLData);

      /* [DONE] For each article, insert the created HTML code into the link list in the left column.*/
      allLinksHTML+=articleHtmlLink;
    }
    document.querySelector('.list').innerHTML = allLinksHTML;
    const links = document.querySelectorAll(opt.optTitleListSelector + ' a');

    for(const link of links){
      link.addEventListener('click', titleClickHandler);
    }

    console.log('Funckja generowania tytułów została wykonana');
  };

  generateTitleLinks();

  const calculateTagsParams = function(tags){
    let params = {
      max: 0,
      min: 999999 
    };

    for(let tag in tags){
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }
    
    return params;
  };

  const calculateTagClass = function(count, params){
    let tagClass =opt.optCloudClassPrefix;
    const maxDiff = params.max - params.min;
    const tagPosition = count - params.min;
    tagClass += Math.floor((tagPosition/maxDiff)*(opt.optCloudClassCount - 1)+1);
    return tagClass;
  };

  const generateTags = function(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(opt.optArticleSelector);

    /* [DONE] START LOOP: for every article: */
    for(const article of articles){

      /* [DONE] find tags wrapper */
      const tagsWrapper = article.querySelector(opt.optArticleTagsSelector);
      
      /* [DONE] make html variable with empty string */
      let htmlString = '';

      /* [DONE] get tags from data-tags attribute */
      const dataTags = article.getAttribute('data-tags'),

        /* [DONE] split tags into array */
        dataTagsArray = dataTags.split(' ');

      /* [DONE] START LOOP: for each tag */
      for (const dataTag of dataTagsArray){

        /* [DONE] generate HTML of the link */
        const tagHTMLData = {tag: dataTag},
          htmlTagLink = templates.tagLink(tagHTMLData);

        /* [DONE] add generated code to html variable */
        htmlString += htmlTagLink;

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[dataTag]) {
          /* [NEW] add tag to allTags object */
          allTags[dataTag] = 1;
        } else {
          allTags[dataTag]++;
        }

        /* [DONE] END LOOP: for each tag */
      }

      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML=htmlString;

      /* [NEW] find list of tags in right column */
      const tagList = document.querySelector(opt.optTagsListSelector);

      const tagsParams = calculateTagsParams(allTags); 

      /* [NEW] create variable for all links HTML code */
      const allTagsData = {tags: []};

      /* [NEW] START LOOP: for each tag in allTags: */
      for(let tag in allTags){
        /* [NEW] generate code of a link and add it to allTagsHTML */
        allTagsData.tags.push({
          tag: tag,
          count: allTags[tag],
          className: calculateTagClass(allTags[tag], tagsParams)
        });
      /* [NEW] END LOOP: for each tag in allTags: */
      }
      /*[NEW] add HTML from allTagsHTML to tagList */
      tagList.innerHTML = templates.tagCloudLink(allTagsData);
      console.log('allTags Data: ', allTagsData);
    /* [DONE] END LOOP: for every article: */
    }
  };

  generateTags();

  const tagClickHandler = function(event){
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this,

      /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
      href = clickedElement.getAttribute('href'),

      /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
      tag = href.replace('#tag-', ''),

      /* [DONE] find all tag links with class active */
      tagsActive = document.querySelectorAll('a.active[href^="#tag-"]');

    /* [DONE] START LOOP: for each active tag link */
    for (const tagActive of tagsActive){

      /* [DONE] remove class active */
      tagActive.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */
    }

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    let tagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* [DONE] START LOOP: for each found tag link */
    for(const tagLink of tagLinks){

      /* [DONE] add class active */
      tagLink.classList.add('active');

    /* [DONE] END LOOP: for each found tag link */
    }

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  const addClickListenersToTags = function(){

    /* [DONE] find all links to tags */
    const links = document.querySelectorAll('a[href^="#tag-"]');

    /* [DONE] START LOOP: for each link */
    for(const link of links){

      /* [DONE] add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);

    /* [DONE] END LOOP: for each link */
    }
  };

  addClickListenersToTags();

  const generateAuthors = function(){
    let allAuthors = {};
    const articles = document.querySelectorAll(opt.optArticleSelector);

    for(const article of articles){
      const authorWrapper = article.querySelector(opt.optArticleAuthorSelector);
      let htmlString = '';
      const dataAuthor = article.getAttribute('data-author'),
        authorHTMLData = {author: dataAuthor},
        htmlAuthorLink = templates.authorLink(authorHTMLData);
      htmlString += htmlAuthorLink;
      authorWrapper.innerHTML=htmlString;

      if(!allAuthors[dataAuthor]) {
        allAuthors[dataAuthor] = 1;
      } else {
        allAuthors[dataAuthor]++;
      }

      const authorList = document.querySelector(opt.optAuthorListSelector);
      const allAuthorsData = {authors: []};
      for(let author in allAuthors){
        allAuthorsData.authors.push({
          author: author,
          authorCount: allAuthors[author]
        });
      }
      authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
      console.log('allAuthors Data: ', allAuthorsData);
    }
  };

  generateAuthors();

  const authorClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this,
      href = clickedElement.getAttribute('href'),
      author = href.replace('#author-', ''),
      authorsActive = document.querySelectorAll('a.active[href^="#author-"]');

    for (const authorActive of authorsActive){
      authorActive.classList.remove('active');
    }

    let authorsLinks = document.querySelectorAll('a[href="' + href + '"]');

    for(const authorLink of authorsLinks){
      authorLink.classList.add('active');
    }

    generateTitleLinks('[data-author="' + author + '"]');
  };

  const addClickListenersToAuthor = function(){
    const links = document.querySelectorAll('a[href^="#author-"]');

    for(const link of links){
      link.addEventListener('click', authorClickHandler);
    }
  };

  addClickListenersToAuthor();

}