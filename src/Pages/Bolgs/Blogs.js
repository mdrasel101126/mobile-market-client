import React from "react";

const Blogs = () => {
  return (
    <div className="my-12">
      <h1 className="text-2xl text-blue-900 text-center font-bold mb-8">
        There is Some Commmon Q&A
      </h1>
      <div className="my-6">
        <h2 className="text-xl text-blue-900 font-semibold mb-5">
          What are the different ways to manage a state in a React application?
        </h2>
        <ul className="list-disc mx-8">
          <li>
            <strong>Local (UI) state :</strong> Local state is data we manage in
            one or another component. Local state is most often managed in React
            using the useState hook.
          </li>
          <li>
            <strong>Global (UI) state :</strong> Global state is data we manage
            across multiple components. Global state is necessary when we want
            to get and update data anywhere in our app, or in multiple
            components at least.
          </li>
          <li>
            <strong>Server state :</strong> Data that comes from an external
            server that must be integrated with our UI state. Server state is a
            simple concept, but can be hard to manage alongside all of our local
            and global UI state. There are several pieces of state that must be
            managed every time you fetch or update data from an external server,
            including loading and error state.
          </li>
          <li>
            <strong>URL state :</strong> Data that exists on our URLs, including
            the pathname and query parameters. URL state is often missing as a
            category of state, but it is an important one. In many cases, a lot
            of major parts of our application rely upon accessing URL state. Try
            to imagine building a blog without being able to fetch a post based
            off of its slug or id that is located in the URL!
          </li>
        </ul>
      </div>
      <div className="my-6">
        <h2 className="text-xl text-blue-900 font-semibold mb-5">
          How does prototypical inheritance work?
        </h2>
        <p className="mx-8">
          Each object has a private property which holds a link to another
          object called its prototype. That prototype object has a prototype of
          its own, and so on until an object is reached with null as its
          prototype. By definition, null has no prototype, and acts as the final
          link in this prototype chain. It is possible to mutate any member of
          the prototype chain or even swap out the prototype at runtime
        </p>
        <p className="mx-8">
          JavaScript objects are dynamic "bags" of properties (referred to as
          own properties). JavaScript objects have a link to a prototype object.
          When trying to access a property of an object, the property will not
          only be sought on the object but on the prototype of the object, the
          prototype of the prototype, and so on until either a property with a
          matching name is found or the end of the prototype chain is reached.
        </p>
      </div>
      <div className="my-6">
        <h2 className="text-xl text-blue-900 font-semibold mb-5">
          What is a unit test? Why should we write unit tests?
        </h2>
        <p className="mx-8">
          <strong>Unit Testing</strong> is a type of software testing where
          individual units or components of a software are tested. The purpose
          is to validate that each unit of the software code performs as
          expected. Unit Testing is done during the development (coding phase)
          of an application by the developers. Unit Tests isolate a section of
          code and verify its correctness. A unit may be an individual function,
          method, procedure, module, or object.
        </p>
        <p className="mx-8">
          Unit Testing is important because software developers sometimes try
          saving time doing minimal unit testing and this is myth because
          inappropriate unit testing leads to high cost Defect fixing during
          System Testing, Integration Testing and even Beta Testing after
          application is built. If proper unit testing is done in early
          development, then it saves time and money in the end.
        </p>
      </div>
      <div className="my-6">
        <h1 className="text-xl text-blue-900 font-semibold mb-5">
          Difference among React vs. Angular vs. Vue?
        </h1>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Angular</th>
                <th>React</th>
                <th>Vue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Programming Lang</th>
                <td>TypeScript</td>
                <td>JavaScript</td>
                <td>JavaScipt</td>
              </tr>

              <tr>
                <th>UI component</th>
                <td>In-built material techstack</td>
                <td>React UI tools</td>
                <td>Component libraries</td>
              </tr>

              <tr>
                <th>Learning curve</th>
                <td>Steep</td>
                <td>Moderate</td>
                <td>Moderate</td>
              </tr>
              <tr>
                <th>Syntax</th>
                <td>Real DOM</td>
                <td>Virtual DOM</td>
                <td>Virtual DOM</td>
              </tr>
              <tr>
                <th>Scalability</th>
                <td>Modular development structure</td>
                <td>Component based approach</td>
                <td>Template based syntax</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
