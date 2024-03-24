const inputUrl = document.getElementById("url");
const button = document.getElementById("submit");
const errorMessage = document.getElementById("error-message");

const regex =
  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

inputUrl.addEventListener("input", () => {
  if (!regex.test(inputUrl.value) && inputUrl.value !== "") {
    button.setAttribute("disabled", true);
    button.style.backgroundColor = "#81c784";
    button.style.cursor = "not-allowed";
    inputUrl.style.borderColor = "red";
    errorMessage.classList.remove("hidden");
    return;
  }
  button.removeAttribute("disabled");
  button.style.backgroundColor = "";
  button.style.cursor = "pointer";
  inputUrl.style.borderColor = "green";
  errorMessage.classList.add("hidden");
});

// hide flash message
const flashMessage = document.getElementById("toast-message");
const toastClose = document.getElementById("toast-close");

const closeToast = () => {
  flashMessage.classList.remove("flash-toast");
  flashMessage.classList.add("close-toast");
};

if (toastClose) {
  setTimeout(() => closeToast(), 5000);
  toastClose.addEventListener("click", closeToast);
}

// TODO: search filter
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const urlParams = new URLSearchParams(window.location.search);
  const searchText = urlParams.get("search") || "";
  searchInput.value = searchText;

  searchInput.addEventListener("change", function () {
    const searchText = this.value.trim();

    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("search", searchText);
    const newParams = queryParams.toString();
    const newUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      newParams;

    window.history.replaceState({ path: newUrl }, "", newUrl);
  });
});
