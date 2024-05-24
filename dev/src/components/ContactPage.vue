<template>
  <form action="https://formspree.io/f/mgegbejd" method="POST" class="flex flex-all">
    <div class="flex flex-all flex-col flex-gap">
      <div class="flex flex-col">
        <label>Name:</label>
        <input type="text" name="name" />
      </div>
      <div class="flex flex-col">
        <label>Email:</label>
        <input type="email" name="email" />
      </div>
      <div class="flex flex-col">
        <label>Message:</label>
        <textarea type="text" name="message" rows="10"></textarea>
      </div>
      <div class="flex">
        <button id="my-form-button">Submit</button>
      </div>
      <p id="my-form-status"></p>
    </div>
  </form>
</template>

<script></script>

<style lang="scss" scoped>
label {
  // color: var(--res-text-light-2);
  color: var(--ds-text);
}

input,
textarea {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: rgba(0, 0, 0, 0.05);
  // color: var(--res-text-light-2);
  color: var(--ds-text);
  font-size: 1rem;
  outline: 0.25rem solid white;
  appearance: none;
  transition: all 0.3s ease-in-out;
  resize: none;

  &:active,
  &:focus {
    background: none;
  }
}

textarea {
  font-family: 'Aptos', sans-serif;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 1rem;
  background-color: var(--ds-button);
  color: var(--ds-accent);
  font-size: 1.5rem;
  text-transform: capitalize;
  cursor: pointer;
  appearance: none;
}

[data-theme='dark'] {
  label {
    color: var(--ds-dark-text);
  }

  input,
  textarea {
    color: var(--ds-dark-text);
    outline-color: var(--ds-dark-outline);
  }

  button {
    background-color: var(--ds-dark-button);
    color: var(--ds-dark-accent);
  }
}

@media screen and (max-width: 768px) {
}
</style>
