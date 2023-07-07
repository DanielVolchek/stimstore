export default function TermsText() {
  return (
    <div>
      <h2>Hello, welcome to StimStore.</h2>
      <p>
        This website is a project I put together so that everyone can have
        access to the mental stimulation they might need at work. Please read
        and accept the following rules to continue. This is a free service and
        as such is an honor system. Please follow the rules so everyone can
        continue having access.
      </p>
      <h2>By using this website, I agree to the following rules: </h2>
      <ul className="list-item list-disc">
        <ListItem>
          Before taking a stim, I will rent the toy on this site
        </ListItem>
        <ListItem>
          Before returning a stim, I will return the toy on this site
        </ListItem>
        <ListItem>
          I will not take any stims back home under any circumstance
        </ListItem>
        <ListItem>
          Whatever happens to a stim I have rented is my responsibility. If I
          lose or break any piece of it I will replace it
        </ListItem>
        <ListItem> </ListItem>
      </ul>
    </div>
  );
}

const ListItem = ({ children }: { children: React.ReactNode }) => {
  return <li className="">{children}</li>;
};
