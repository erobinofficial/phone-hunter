const loadPhones = async (search, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

// display searched phones
const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';
    // 10 phones only 
    
    const loadMoreBtn = document.getElementById('load-more');
    if (dataLimit && phones.length > 10) {
      phones = phones.slice(0,10);
      loadMoreBtn.classList.remove('d-none');
    }
    // no result found 
    const noFound = document.getElementById('no-found');
    if (phones.length === 0){
      noFound.classList.remove('d-none');
    }
    else{
      noFound.classList.add('d-none');
    }
    phones.forEach(phone => {
        console.log(phone);
        const {image, phone_name, brand} = phone;
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
                    <div class="card">
                        <img src="${image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${phone_name}</h5>
                          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                      </div>
                    `;
        phonesContainer.appendChild(phoneDiv);
    })
    toggleBuffering(false);
}

// toggle buffering

const toggleBuffering = buffering => {
  const toggleBuffer = document.getElementById('buffer');
  if (buffering) {
    toggleBuffer.classList.remove('d-none');
  }
  else{
    toggleBuffer.classList.add('d-none');
  }
}
// process limit 
 const processLimit = (dataLimit) => {
  toggleBuffering(true);
  const search = document.getElementById('search-field').value;
  loadPhones(search, dataLimit);
 }

// button handler
document.getElementById('button').addEventListener('click', function(){
  processLimit(10);
})

// load more button 
document.getElementById('load-more-btn').addEventListener('click', function(){
  processLimit();
});