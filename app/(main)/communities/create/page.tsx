import CommunityForm from "@/features/community/components/CommunityForm";

export default function CreateCommunityPage() {
  return (
    <div className="mx-auto max-w-3xl">

      <h1 className="text-3xl font-bold mb-6">
        Create Community
      </h1>

      <CommunityForm />

    </div>
  );
}