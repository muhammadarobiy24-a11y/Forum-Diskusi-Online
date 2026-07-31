import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="space-y-4">
      {/* 
        Header is now handled inside RegisterForm for better alignment
        with the Frosted Touch aesthetic and easier state handling.
      */}
      <RegisterForm />
    </div>
  );
}
