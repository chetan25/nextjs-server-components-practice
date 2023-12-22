const paths = {
  homePath() {
    return "/";
  },
  topicShowPath(slug: string) {
    return `/topics/${slug}`;
  },
  postCreatePath(slug: string) {
    return `/topics/${slug}/posts/new`;
  },
  postShowPath(slug: string, id: string) {
    return `/topics/${slug}/posts/${id}`;
  },
};

export default paths;
