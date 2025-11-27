type JoinPageProps = {
  params: { token: string };
};

export default function JoinPage({ params }: JoinPageProps) {
  const { token } = params;

  return (
    <main>
      <h1>Join calendar</h1>
      <p>Invite token: {token}</p>
      <p>TODO: Call join endpoint and handle membership.</p>
    </main>
  );
}
