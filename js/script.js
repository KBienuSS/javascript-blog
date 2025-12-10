{
  'use strict';
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(optTitleListSelector + ' a.active');

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
  
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    for(const article of articles){

      /* [DONE] For each article, read its ID and save it to a constant.*/
      const articleId = article.getAttribute('id'),

        /* [DONE] For each article, find the title element and save its contents to a constant.*/
        articleTitle = article.querySelector(optTitleSelector).textContent,

        /* [DONE] For each article, create the HTML link code based on this information and save it to a constant.*/
        articleHtmlLink = '<li><a href="#' + articleId +'" ><span>'+articleTitle+'</span></a></li>';

      /* [DONE] For each article, insert the created HTML code into the link list in the left column.*/
      allLinksHTML+=articleHtmlLink;
    }
    document.querySelector('.list').innerHTML = allLinksHTML;
    const links = document.querySelectorAll(optTitleListSelector + ' a');

    for(const link of links){
      link.addEventListener('click', titleClickHandler);
    }

    console.log('Funckja generowania tytułów została wykonana');
  };

  generateTitleLinks();

  const generateTags = function(){

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */
    for(const article of articles){

      /* [DONE] find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      
      /* [DONE] make html variable with empty string */
      let htmlString = '';

      /* [DONE] get tags from data-tags attribute */
      const dataTags = article.getAttribute('data-tags'),

        /* [DONE] split tags into array */
        dataTagsArray = dataTags.split(' ');

      /* [DONE] START LOOP: for each tag */
      for (const dataTag of dataTagsArray){

        /* [DONE] generate HTML of the link */
        const htmlTagLink = '<li><a href="#tag-'+ dataTag +'">'+ dataTag +'</a></li>';

        /* [DONE] add generated code to html variable */
        htmlString += htmlTagLink;

        /* [DONE] END LOOP: for each tag */
      }

      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML=htmlString;

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
    const articles = document.querySelectorAll(optArticleSelector);

    for(const article of articles){
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      let htmlString = '';
      const dataAuthor = article.getAttribute('data-author'),
        htmlTagLink = '<a href="#author-'+ dataAuthor +'">'+ dataAuthor +'</a>';
      htmlString += htmlTagLink;
      authorWrapper.innerHTML=htmlString;
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