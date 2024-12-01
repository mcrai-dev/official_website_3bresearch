const form = document.getElementById("newsletter-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = form.email.value;

  const response = await fetch("/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (response.ok) {
    alert("Merci pour votre inscription !");
    form.reset();
  } else {
    const error = await response.text();
    alert(`Erreur : ${error}`);
  }
});