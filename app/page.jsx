import Feed from "@components/Feed";

function Home() {
  return (
    // Removed justify-center. If you still want content horizontally centered,
    // ensure the content inside has appropriate margins or its own centering.
    <section className="w-full flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mt-8 mb-8">HR Dashboard</h1> {/* Added margin and dark mode text */}
      <Feed />
    </section>
  );
}

export default Home;