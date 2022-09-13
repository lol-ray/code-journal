var $imagePreview = document.querySelector('#image-preview');
var $photoURLInput = document.querySelector('#photo-url');
var $form = document.querySelector('form');

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
  ++data.nextEntryId;
  data.entries.unshift(formData);
  $form.reset();
  $imagePreview.setAttribute('src', 'images/placeholder-image-square.jpg');
});
