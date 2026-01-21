import { auth } from "@/lib/auth";

  const adminEmail = 'admin@example.com';
  const adminPassword = 'AdminPassword123!'; // Change this to a strong password
  const adminName = 'Admin User';


async function createAdminUser() {
  try {
    // Some versions of Better Auth might have admin APIs
    const result = await auth.api.signUpEmail({
      body: {
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      }
    })

    console.log('✅ Admin user created successfully!', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

createAdminUser();