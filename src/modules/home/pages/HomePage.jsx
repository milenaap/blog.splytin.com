export const HomePage = () => {
  const featuredStories = [
    {
      id: 1,
      title: "Historia uno111",
      description: "Una pequeña historia breve.",
      image: "https://picsum.photos/800/500?random=1",
    },
    {
      id: 2,
      title: "Historia dos",
      description: "Otro texto corto.",
      image: "https://picsum.photos/800/500?random=2",
    },
    {
      id: 3,
      title: "Historia tres",
      description: "Descripción sencilla.",
      image: "https://picsum.photos/800/500?random=3",
    },
  ];

  const latestPosts = [
    {
      id: 1,
      title: "Post uno",
      image: "https://picsum.photos/500/350?random=4",
    },
    {
      id: 2,
      title: "Post dos",
      image: "https://picsum.photos/500/350?random=5",
    },
    {
      id: 3,
      title: "Post tres",
      image: "https://picsum.photos/500/350?random=6",
    },
    {
      id: 4,
      title: "Post cuatro",
      image: "https://picsum.photos/500/350?random=7",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 text-gray-800">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-200/20 via-purple-200/20 to-blue-200/20 blur-2xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-white/70 px-4 py-1 text-sm font-medium text-gray-600 shadow-sm backdrop-blur">
                Blog de historias random
              </span>

              <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
                Historias con un toque creativo
              </h1>

              <p className="mt-4 max-w-xl text-lg text-gray-600">
                Un espacio visual donde cada historia tiene su propia estética.
              </p>

              <div className="mt-6 flex gap-4">
                <button className="rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 px-5 py-3 font-semibold text-white shadow-md transition hover:scale-105">
                  Explorar
                </button>
                <button className="rounded-xl border bg-white/70 px-5 py-3 text-gray-700 shadow-sm backdrop-blur hover:bg-white">
                  Últimos
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/40 shadow-xl">
              <img
                src="https://picsum.photos/1000/650?random=10"
                alt="Hero"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold">Historias destacadas</h2>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featuredStories.map((story) => (
            <article
              key={story.id}
              className="overflow-hidden rounded-2xl border border-white/40 bg-white/70 shadow-md backdrop-blur transition hover:shadow-lg"
            >
              <img
                src={story.image}
                alt={story.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold">{story.title}</h3>
                <p className="mt-2 text-sm text-gray-600">
                  {story.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold">Últimos posts</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {latestPosts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-2xl border bg-white/60 shadow-sm backdrop-blur transition hover:shadow-md"
            >
              <img
                src={post.image}
                alt={post.title}
                className="h-40 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="text-sm font-semibold">{post.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};