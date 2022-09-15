const USERNAME = /^[^\W]+$/u;
const EMAIL =
    /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/u;
const PLAN_NAME = /^[^ ]+$/u;

export { EMAIL, PLAN_NAME, USERNAME };
