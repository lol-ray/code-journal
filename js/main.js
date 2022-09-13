var $imagePreview = document.querySelector('#image-preview');
var $photoURLInput = document.querySelector('#photo-url');

$photoURLInput.addEventListener('input', function (event) {
  $imagePreview.setAttribute('src', $photoURLInput.value);
  if ($photoURLInput.value === '') {
    $imagePreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
});
