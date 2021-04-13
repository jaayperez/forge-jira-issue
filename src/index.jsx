import api from "@forge/api";
import ForgeUI, { render, Fragment, Text, IssuePanel, useProductContext, useState } from '@forge/ui';


const fetchCommentsForIssue = async (issueId) => {
  const res = await api
    /* Modify this call by changing `.asApp()` to `.asUser()` */
    .asUser()
    .requestJira(`/rest/api/3/issue/${issueId}/comment`);

  const data = await res.json();
  return data.comments;
};


const App = () => {
  const context = useProductContext();
  const [comments] = useState(async () => await fetchCommentsForIssue(context.platformContext.issueKey));

  console.log(`Number of comments on this issue: ${comments.length}`);
  return (
    <Fragment>
      <Text>Hello world!</Text>
      <Text>
        Number of comments on this issue: {comments.length}
      </Text>
    </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
