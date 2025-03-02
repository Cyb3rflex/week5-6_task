<script setup>
import { useRouter } from "vue-router";
import { useCookie } from "#app";

const router = useRouter();
const token = useCookie("token");

// Clear the auth token and redirect to login
token.value = null;
router.push("/auth/login");
</script>
