import CommunityForm from "@/features/community/components/CommunityForm";

export default function CreateCommunityPage() {
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth h-full relative">
      <div className="absolute inset-0 bg-[var(--dc-chat-bg)] pointer-events-none" />
      
      {/* Decorative ambient lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-500/10 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 py-12 md:py-20 relative z-10">
        <CommunityForm />
      </div>
    </div>
  );
}