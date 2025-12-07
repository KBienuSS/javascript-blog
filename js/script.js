{
  "use strict"; 

  const titleClickHandler = function(event){
      event.preventDefault();
      const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
      const activeLinks = document.querySelectorAll('.titles a.active');

      for(let activeLink of activeLinks){
          activeLink.classList.remove('active');
      }

    /* [DONE] add class 'active' to the clicked link */
      clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
      const activeArticles = document.querySelectorAll('.posts .active');

      for(let activeArticle of activeArticles){
          activeArticle.classList.remove('active');
      }

    /* [DONE] get 'href' attribute from the clicked link */
      const attributeClickedElement = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
      const correctArticle = document.querySelector(attributeClickedElement);

    /* [DONE] add class 'active' to the correct article */
      correctArticle.classList.add('active');
  }

  const generateTitleLinks = function(){
    /* [DONE] Delete the contents of the link list in the left column.*/
    document.querySelector('.list').innerHTML="";
    let allLinksHTML = "";
  
    const articles = document.querySelectorAll('.post');

    for(let article of articles){
      /* [DONE] For each article, read its ID and save it to a constant.*/
      const articleId = article.getAttribute('id');
      console.log(articleId);
      /* [DONE] For each article, find the title element and save its contents to a constant.*/
      const articleTitle = article.querySelector('.post-title').textContent;
      console.log(articleTitle);
      /* [DONE] For each article, create the HTML link code based on this information and save it to a constant.*/
      const articleHtmlLink = "<li><a href='#" + articleId +"' ><span>"+articleTitle+"</span></a></li>";
      /* [DONE] For each article, insert the created HTML code into the link list in the left column.*/
      allLinksHTML+=articleHtmlLink;
    }
    document.querySelector('.list').innerHTML = allLinksHTML;
    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

    console.log("Funckja generowania tytułów została wykonana");
  }

  generateTitleLinks();
}