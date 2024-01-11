export default function Page({ params }: { params: { slug: string } }) {
    return <div>My P: {params.slug}</div>;
  }
  