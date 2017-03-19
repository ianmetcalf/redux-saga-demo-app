export function getNavigation(state = {}) {
  const {
    navigation = {},
  } = state;

  return navigation;
}

export function isActiveRoute(state, path) {
  const {
    pathname,
    route,
  } = getNavigation(state);

  return path === pathname || path === route;
}
