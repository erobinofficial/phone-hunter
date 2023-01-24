const loadPhones = async (search, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
}

// display searched phones
const displayPhones = (phones, dataLimit) => {
  // console.log(phones);
  const phonesContainer = document.getElementById('phone-container');
  phonesContainer.textContent = '';
  // 10 phones only 

  const loadMoreBtn = document.getElementById('load-more');
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    loadMoreBtn.classList.remove('d-none');
  }
  // no result found 
  const noFound = document.getElementById('no-found');
  if (phones.length === 0) {
    noFound.classList.remove('d-none');
  }
  else {
    noFound.classList.add('d-none');
  }
  phones.forEach(phone => {
    // console.log(phone);
    const { image, phone_name, brand, slug } = phone;
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `
                    <div class="card">
                        <img src="${image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${phone_name}</h5>
                          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                          <a onclick="loadPhoneDetails('${slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetails">Show Details</a>
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
  else {
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
document.getElementById('button').addEventListener('click', function () {
  processLimit(10);
})

// load more button 
document.getElementById('load-more-btn').addEventListener('click', function () {
  processLimit();
  const loadMoreButton = document.getElementById('load-more');
  loadMoreButton.classList.add('d-none');
});

// "Enter" Click reaction
const input = document.getElementById("search-field");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("button").click();
  }
});

// phone details fetch data 
const loadPhoneDetails = async id => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);

}

// display phone details 
const displayPhoneDetails = phone => {
  console.log(phone);
  const { image, name, brand, slug, mainFeatures, others } = phone;
  const { chipSet, memory, displaySize, sensors } = mainFeatures;
  const { WLAN, Bluetooth, GPS, Radio, NFC, USB } = others || 'Not Available..';
  const modalDetails = document.getElementById('modal-details');
  modalDetails.innerHTML = `
  <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">${name}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body justify-content-center  d-flex">
                <img src="${image}" class="img-fluid " alt="...">
                

              </div>
              <div class ="p-3">
              <h4>Brand : ${brand}</h4>
              <p>Chipset : ${chipSet}</br>
                Memory : ${memory}</br>
                Display Size: ${displaySize}</br>
                Features:</br>
                WLAN : ${WLAN || 'Not Available'}</br>
                Bluetooth : ${Bluetooth || 'Not Available'}</br>
                GPS : ${GPS || 'Not Available'}</br>
                Radio : ${Radio || 'Not Available'}</br>
                NFC : ${NFC || 'Not Available'}</br>
                USB : ${USB || 'Not Available'}</br>
                Sensors : ${sensors.map(sensor => sensor).join(", ") || "Not Available"}

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
  
  `;

}
