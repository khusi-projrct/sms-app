export const hasPermission = (permissions, module, action) => {
  return permissions?.some(
    (p) => p.module === module && p.actions.includes(action)
  );
};
