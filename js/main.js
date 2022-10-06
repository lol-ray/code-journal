var $imagePreview = document.querySelector('#image-preview');
var $photoURLInput = document.querySelector('#photo-url');
var $form = document.querySelector('form');
var $entryList = document.querySelector('.entry-list');
var $entryView = document.querySelector('div[data-view="entries"]');
var $formView = document.querySelector('div[data-view="entry-form"]');
var $navEntries = document.querySelector('.nav-entries');
var $btnNew = document.querySelector('.btn-new-entry');
var $submitEntry = document.querySelector('#save');
var $entryHeading = document.querySelector('.entry-heading');
var $btnDelete = document.querySelector('.delete');

$photoURLInput.addEventListener('input', function (event) {
  $imagePreview.setAttribute('src', $photoURLInput.value);
  if ($photoURLInput.value === '') {
    $imagePreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = {
    title: $form.elements.title.value,
    photoURL: $form.elements['photo-url'].value,
    notes: $form.elements.notes.value,
    entryID: data.nextEntryId
  };
  if (data.editing === null) {
    ++data.nextEntryId;
    data.entries.unshift(formData);
    displayEntry(formData);
    $entryList.prepend(displayEntry(formData));
  } else {
    for (const x of data.entries) {
      if (x === data.editing) {
        x.title = formData.title;
        x.photoURL = formData.photoURL;
        x.notes = formData.notes;
        var $toReplace = document.querySelector('[data-entry-id=' + '"' + x.entryID + '"]');
        $toReplace.replaceWith(displayEntry(x));
        data.editing = null;
      }
    }
  }
  $form.reset();
  $imagePreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  viewSwap('entries');
});

$navEntries.addEventListener('click', function () {
  viewSwap('entries');
});
$btnNew.addEventListener('click', function () {
  viewSwap('entry-form');
  $entryHeading.textContent = 'New Entry';
  $btnDelete.className = 'delete hidden';
  $form.reset();
  $imagePreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  data.editing = null;
});
$submitEntry.addEventListener('click', function () {
  $entryView.className = 'container';
  $formView.className = 'container hidden';
});

window.addEventListener('DOMContentLoaded', function () {
  viewSwap(data.view);
  if (data.editing === null) {
    $btnDelete.className = 'delete hidden';
  } else {
    $btnDelete.className = 'delete';
  }
});

$entryList.addEventListener('click', entryEdit);

function displayEntry(entry) {
  var newLi = document.createElement('li');
  newLi.setAttribute('data-entry-id', entry.entryID);

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

  var editContainer = document.createElement('div');
  editContainer.setAttribute('class', 'flex justify-space-between align-items-center');
  halfCol2.appendChild(editContainer);

  var h3 = document.createElement('h3');
  var h3Title = document.createTextNode(entry.title);
  h3.appendChild(h3Title);
  editContainer.appendChild(h3);

  var editButton = document.createElement('i');
  editButton.setAttribute('class', 'fa-solid fa-pen');
  editContainer.appendChild(editButton);

  var p = document.createElement('p');
  var pNotes = document.createTextNode(entry.notes);
  p.appendChild(pNotes);
  halfCol2.appendChild(p);

  return newLi;
}

for (let i = 0; i < data.entries.length; ++i) {
  $entryList.appendChild(displayEntry(data.entries[i]));
}

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

var $formTitle = document.querySelector('#title');
var $formPhoto = document.querySelector('#photo-url');
var $formNotes = document.querySelector('#notes');

function entryEdit(event) {
  if (event.target.matches('.fa-pen')) {
    $form.reset();
    viewSwap('entry-form');
    $entryHeading.textContent = 'Edit Entry';
    $btnDelete.className = 'delete';
    var editId = event.target.closest('li').getAttribute('data-entry-id');
    for (const x of data.entries) {
      if (x.entryID === Number(editId)) {
        data.editing = x;
      }
    }
    $formTitle.value = data.editing.title;
    $formPhoto.value = data.editing.photoURL;
    $formNotes.value = data.editing.notes;
    $imagePreview.setAttribute('src', data.editing.photoURL);
  }
}
