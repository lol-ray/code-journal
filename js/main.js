var $imagePreview = document.querySelector('#image-preview');
var $photoURLInput = document.querySelector('#photo-url');
var $form = document.querySelector('form');

$photoURLInput.addEventListener('input', function (event) {
  $imagePreview.setAttribute('src', $photoURLInput.value);
  if ($photoURLInput.value === '') {
    $imagePreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
});

function displayEntry(entry) {
  var newLi = document.createElement('li');

  var divRow = document.createElement('div');
  divRow.setAttribute('class', 'row');
  newLi.appendChild(divRow);

  var halfCol1 = document.createElement('div');
  halfCol1.setAttribute('class', 'column-half padding-right-75rem padding-bottom-75rem');
  divRow.appendChild(halfCol1);

  var imgDisplay = document.createElement('img');
  imgDisplay.setAttribute('class', 'entry-img');
  imgDisplay.setAttribute('src', entry.photoURL);
  halfCol1.appendChild(imgDisplay);

  var halfCol2 = document.createElement('div');
  halfCol2.setAttribute('class', 'column-half padding-left-75rem');
  divRow.appendChild(halfCol2);

  var h3 = document.createElement('h3');
  var h3Title = document.createTextNode(entry.title);
  h3.appendChild(h3Title);
  halfCol2.appendChild(h3);

  var p = document.createElement('p');
  var pNotes = document.createTextNode(entry.notes);
  p.appendChild(pNotes);
  halfCol2.appendChild(p);

  return newLi;
}

var entryList = document.querySelector('.entry-list');

for (let i = 0; i < data.entries.length; ++i) {
  entryList.appendChild(displayEntry(data.entries[i]));
}

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = {
    title: $form.elements.title.value,
    photoURL: $form.elements['photo-url'].value,
    notes: $form.elements.notes.value,
    entryID: data.nextEntryId
  };
  ++data.nextEntryId;
  data.entries.unshift(formData);
  displayEntry(formData);
  entryList.prepend(displayEntry(formData));
  $form.reset();
  $imagePreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  viewSwap('entries');
});

var $entryView = document.querySelector('div[data-view="entries"]');
var $formView = document.querySelector('div[data-view="entry-form"]');
var $navEntries = document.querySelector('.nav-entries');
var $btnNew = document.querySelector('.btn-new-entry');
var $submitEntry = document.querySelector('#save');

$navEntries.addEventListener('click', function () {
  viewSwap('entries');
});
$btnNew.addEventListener('click', function () {
  viewSwap('entry-form');
});
$submitEntry.addEventListener('click', function () {
  $entryView.className = 'container';
  $formView.className = 'container hidden';
});

function viewSwap(dataView) {
  data.view = dataView;
  if (dataView === 'entries') {
    $entryView.className = 'container';
    $formView.className = 'container hidden';
  } else if (dataView === 'entry-form') {
    $entryView.className = 'container hidden';
    $formView.className = 'container';
  }
}

window.addEventListener('DOMContentLoaded', function () {
  viewSwap(data.view);
});
