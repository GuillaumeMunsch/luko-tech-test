import { addInventoryItemValidate } from '../../src/utils/validates';

it(`Failing empty form test`, () => {
  const formValues = {};
  const res = addInventoryItemValidate(formValues);
  expect(res).toStrictEqual({ name: 'Required' });
});

it(`Failing name too long test`, () => {
  const formValues = {
    name: "I'm a failing test because the name is too long",
  };
  const res = addInventoryItemValidate(formValues);
  expect(res).toStrictEqual({ name: 'Name too long' });
});

it(`Failing price missing test`, () => {
  const formValues = { name: 'Jewel' };
  const res = addInventoryItemValidate(formValues);
  expect(res).toStrictEqual({ purchasePrice: 'Required' });
});

it(`Failing price not numeric test`, () => {
  const formValues = { name: 'Jewel', purchasePrice: 'Hello' };
  const res = addInventoryItemValidate(formValues);
  expect(res).toStrictEqual({ purchasePrice: 'Invalid value' });
});

it(`Failing price too big test`, () => {
  const formValues = { name: 'Jewel', purchasePrice: '6574884' };
  const res = addInventoryItemValidate(formValues);
  expect(res).toStrictEqual({ purchasePrice: 'Price too big' });
});

it(`Failing missing photo test`, () => {
  const formValues = {
    name: 'Jewel',
    purchasePrice: '450',
  };

  const res = addInventoryItemValidate(formValues);
  expect(res).toStrictEqual({ photo: 'Required' });
});

it(`Failing description too long test`, () => {
  const formValues = {
    name: 'Jewel',
    purchasePrice: '450',
    photo:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bijouxmedusa.com%2Ffr-uk%2Fproducts%2Fchaine-en-or-10k-2-5mm-torsade&psig=AOvVaw16HsFOefJPHrA1bDsYqwtV&ust=1644852762882000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJDHg5qA_fUCFQAAAAAdAAAAABAD',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla enim ut inventore repudiandae impedit odio necessitatibus voluptatem voluptatibus ipsum hic, molestiae, provident nam incidunt beatae magni libero architecto quas blanditiis. A numquam, deserunt nihil optio doloremque dolorum debitis cupiditate ducimus exercitationem architecto temporibus quas repellendus cumque assumenda qui molestias officiis cum, illum ipsum ullam. Assumenda harum animi et nostrum odit. Iste veritatis maiores eius, tempore animi non amet odit sunt praesentium quasi facere! Ex ut incidunt dolorem non tempore architecto vero accusamus sequi tenetur animi, debitis quaerat harum nisi odit. Unde earum ipsa eaque. Odio nesciunt numquam nulla cum voluptas quaerat fugiat reprehenderit, commodi quasi quo aliquid vitae illo velit qui optio error obcaecati a sint cupiditate perspiciatis eum quia. Libero, iusto quibusdam! Accusamus assumenda voluptatem, sunt vel quidem animi deleniti porro deserunt perferendis. Inventore odio in nisi velit. Sapiente molestias soluta sed dicta! Nam, quam? Soluta obcaecati asperiores dolor? Quisquam quo vero, odio natus iste nesciunt. Voluptate quis voluptatem quo quia officiis molestias distinctio aut. Obcaecati, totam? Iusto soluta amet quos consequatur a! Nobis accusantium quisquam debitis ipsum id!',
  };

  const res = addInventoryItemValidate(formValues);
  expect(res).toStrictEqual({ description: 'Description too long' });
});

it(`Success form test`, () => {
  const formValues = {
    name: 'Jewel',
    purchasePrice: '450',
    description: 'Small description',
    photo:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bijouxmedusa.com%2Ffr-uk%2Fproducts%2Fchaine-en-or-10k-2-5mm-torsade&psig=AOvVaw16HsFOefJPHrA1bDsYqwtV&ust=1644852762882000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJDHg5qA_fUCFQAAAAAdAAAAABAD',
  };

  const res = addInventoryItemValidate(formValues);
  expect(res).toStrictEqual({});
});
