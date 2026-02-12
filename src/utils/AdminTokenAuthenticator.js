import "dotenv/config";
export default function validateAdminCreds(cred) {
  return (
    process.env.ADMIN_EMAIL == cred.email &&
    process.env.ADMIN_PASSWORD == cred.password
  );
}
