const strengthMeter = document.getElementById("strength-meter");
const passwordInput = document.getElementById("password");
const reasons = document.getElementById("reasons");

passwordInput.addEventListener("input", updatePasswordStrengthMeter);

updatePasswordStrengthMeter();

function updatePasswordStrengthMeter() {
  const weaknesses = passwordStrength(passwordInput.value);
  let strength = 100;
  reasons.innerHTML = "";

  weaknesses.forEach((weakness) => {
    if (weakness == null) return;
    strength -= weakness.deduction;

    const messageElement = document.createElement("div");
    messageElement.innerText = weakness.message;
    reasons.appendChild(messageElement);
  });

  strengthMeter.style.setProperty("--strength", strength);
}

function passwordStrength(password) {
  const weaknesses = [];

  weaknesses.push(lengthWeakness(password));
  weaknesses.push(lowerCaseWeakness(password));
  weaknesses.push(upperCaseWeakness(password));
  weaknesses.push(specialCharactersWeakness(password));
  weaknesses.push(numbersWeakness(password));
  weaknesses.push(repeatedCharactersWeakness(password));

  return weaknesses;
}

function lowerCaseWeakness(password) {
  const matches = password.match(/[a-z]/g) || [];
  if (matches.length === 0) {
    return {
      message: "Your password has no lower case characters.",
      deduction: 20,
    };
  }
  if (matches.length <= 2) {
    return {
      message: "Your password could use more lower case characters.",
      deduction: 10,
    };
  }
}

function upperCaseWeakness(password) {
  const matches = password.match(/[A-Z]/g) || [];
  if (matches.length === 0) {
    return {
      message: "Your password has no upper case characters.",
      deduction: 20,
    };
  }
  if (matches.length <= 2) {
    return {
      message: "Your password could use more upper case characters.",
      deduction: 10,
    };
  }
}

function numbersWeakness(password) {
  const matches = password.match(/[0-9]/g) || [];
  if (matches.length === 0) {
    return {
      message: "Your password has no number characters.",
      deduction: 20,
    };
  }
  if (matches.length <= 2) {
    return {
      message: "Your password could use more number characters.",
      deduction: 10,
    };
  }
}

function specialCharactersWeakness(password) {
  const matches = password.match(/[^0-9a-zA-Z\s]/g) || [];
  if (matches.length === 0) {
    return {
      message: "Your password has no special characters.",
      deduction: 20,
    };
  }
  if (matches.length <= 2) {
    return {
      message: "Your password could use more special characters.",
      deduction: 10,
    };
  }
}

function lengthWeakness(password) {
  const length = password.length;
  if (length <= 5) {
    return {
      message: "Your password is too short.",
      deduction: 45,
    };
  }

  if (length <= 10) {
    return {
      message: "Your password could be longer.",
      deduction: 15,
    };
  }
}

function repeatedCharactersWeakness(password) {
  const matches = password.match(/(.)\1/g) || [];
  if (matches.length > 0) {
    return {
      message: "Your password has repeated characters",
      deduction: matches.length * 10,
    };
  }
}
