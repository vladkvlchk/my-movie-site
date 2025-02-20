<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="email" class="label">Email</label>
      <input type="email" id="email" v-model="email" required />
      <p v-if="validationError.email" class="error-message">
        {{ validationError.email }}
      </p>
    </div>

    <div class="form-group">
      <label for="password" class="label">Password</label>
      <input type="password" id="password" v-model="password" required />
      <p v-if="validationError.password" class="error-message">
        {{ validationError.password }}
      </p>
    </div>

    <button class="submit-button" type="submit">Sign In</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      validationError: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

      if (!this.email) {
        this.validationError.email = "Email is required.";
      } else if (!emailRegex.test(this.email)) {
        this.validationError.email = "Please enter a valid email.";
      } else {
        this.validationError.email = "";
      }
    },
    validatePassword() {
      if (!this.password) {
        this.validationError.password = "Password is required.";
      } else if (this.password.length < 6) {
        this.validationError.password =
          "Password must be at least 6 characters long.";
      } else {
        this.validationError.password = "";
      }
    },
    handleSubmit() {
      this.validateEmail();
      this.validatePassword();

      if (this.validationError.email || this.validationError.password) return;

      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 14px;
}

.label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #111;
}

.error-message {
  color: red;
  font-size: 12px;
  line-height: 1;
}

.submit-button {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background-color: black;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}

.submit-button:hover {
  background-color: #333;
}
</style>
