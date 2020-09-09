
const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
const bookList = window.app;

function searchFiles(searchText){
    let matches = bookList.filter( (book) =>{
        const regex = new RegExp(`^${searchText}`, 'gi');
        return book.filename.match(regex);
    });
    if(searchText.length === 0){
        matches = [];
        matchList.innerHTML = '';
    }
    console.log(matches);
    showHTML(matches);
};

// show results in HTML
function showHTML(matches){
    if(matches.length > 0){
        const html = matches
            .map((match) => `
            <div class = "card card-body mb-1"> 
                <h6> 
                    <a href= "/books/${match._id}" class="text-muted">${match.filename}</a>
                </h6>
                <small>
                    <span style="color:cyan">Book Type:</span> ${match['Book Type']} 
                </small>
                <small><span style = "color:cyan">Description:</span> ${match['Legal Description']}</small>
            </div>
        `    
            ).join('');
        matchList.innerHTML = html;
    }
};

search.addEventListener('input', () => { searchFiles(search.value); });