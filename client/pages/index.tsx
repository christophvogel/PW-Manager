import { useState } from "react";
import styled from "styled-components";

const SubmitButton = styled.button`
  @import url("https://fonts.googleapis.com/css2?family=Bangers&display=swap");
  border-radius: 10px;
  border-style: dotted;
  font-size: 3em;
  font-weight: bold;
  font-family: "Bangers", cursive;
`;

const Container = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  place-items: center;
`;

const Text = styled.p`
  font-family: "Bangers", cursive;
  font-size: 5em;
`;

const InputField = styled.input`
  border-radius: 10px;
  height: 2em;
  width: 10em;
  font-size: 3em;
  font-family: "Bangers", cursive;
`;

export default function Home() {
  const [passwordName, setPasswordName] = useState("");
  const [passwordDoc, setPasswordDoc] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await fetch(
      `http://localhost:3333/api/passwords/${passwordName}`
    );
    const passwordDoc = await result.json();
    setPasswordDoc(passwordDoc);
  }
  return (
    <>
      <Container>
        <form onSubmit={(e) => handleSubmit(e)}>
          <InputField
            value={passwordName}
            onChange={(event) => setPasswordName(event.target.value)}
          />
          <SubmitButton type="submit">Send</SubmitButton>
        </form>
        {passwordDoc && (
          <Text>
            {passwordDoc.name} {passwordDoc.value}
          </Text>
        )}
      </Container>
    </>
  );
}
