export default function AboutUsPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 md:py-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          About Boon
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover the story and passion behind our curated collection.
        </p>
      </header>
      <div className="prose prose-lg dark:prose-invert mx-auto">
        <h2>Our Mission</h2>
        <p>
          At Boon, our mission is simple: to bring you a meticulously curated
          selection of high-quality products that enhance your life. We believe
          that good design and exceptional quality shouldn&apos;t be a luxury,
          but a standard. We search far and wide to find items that are not only
          beautiful and functional but also built to last.
        </p>
        <h2>The Journey</h2>
        <p>
          Founded in 2024, Boon started as a small passion project driven by a
          love for technology, design, and thoughtful living. We were tired of
          the endless scroll and the overwhelming choices offered by massive
          online retailers. We wanted to create a space where every item is a
          &ldquo;boon&ldquo;—a benefit, a blessing, a treasure.
        </p>
        <h2>Our Promise</h2>
        <p>
          We are committed to providing an exceptional shopping experience from
          start to finish. This means fast shipping, responsive customer
          support, and a collection you can trust. Thank you for being a part of
          our journey. We&apos;re excited to have you with us.
        </p>
      </div>
    </div>
  );
}