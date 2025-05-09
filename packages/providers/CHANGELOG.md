# @plone/providers Release Notes

<!-- Do *NOT* add new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/contributing/index.html#contributing-change-log-label
-->

<!-- towncrier release notes start -->

## 1.0.0-alpha.8 (2025-02-08)

### Internal

- Update internal `peerDependencies` to include React 19.
  Update TS version. @sneridagh [#6641](https://github.com/plone/volto/issues/6641)
- Remove no longer required dependencies.  @sneridagh [#6728](https://github.com/plone/volto/issues/6728)

## 1.0.0-alpha.7 (2025-01-24)

### Internal

- Centralize `tsconfig`. @sneridagh [#6536](https://github.com/plone/volto/issues/6536)

## 1.0.0-alpha.6 (2024-11-21)

### Feature

- Update RAC to 1.5.0 @sneridagh [#6498](https://github.com/plone/volto/issues/6498)

## 1.0.0-alpha.5 (2024-11-05)

### Internal

- Improve packaging. @sneridagh 

## 1.0.0-alpha.4 (2024-11-05)

### Internal

- Bump local `typescript` version. @sneridagh [#6461](https://github.com/plone/volto/issues/6461)
- Replace `parcel` with `tsup`. Better types, better tsconfig. Move to ESM. @sneridagh [#6468](https://github.com/plone/volto/issues/6468)

## 1.0.0-alpha.3 (2024-10-18)

## 1.0.0-alpha.2 (2024-10-18)

### Breaking

- Improve and group providers. @sneridagh
  Breaking:
    - The interface of the providers has changed. Please check the new one, and adapt your apps accordingly. [#6069](https://github.com/plone/volto/issues/6069)

### Internal

- Update typescript and vitest everywhere @sneridagh [#6407](https://github.com/plone/volto/issues/6407)

## 1.0.0-alpha.1 (2024-05-23)

### Internal

- Cleanup imports in RouterLocation provider @pnicolli [#6029](https://github.com/plone/volto/issues/6029)

## 1.0.0-alpha.0 (2024-05-13)

### Feature

- Initial implementation @sneridagh [#5887](https://github.com/plone/volto/issues/5887)

### Internal

- Improvements to the monorepo setup with utilities, especially ESLint. Build cached option to speedup operations. @sneridagh [#5969](https://github.com/plone/volto/issues/5969)
- Saner defaults for building deps, switch default to cached, add `build:force` command @sneridagh [#5980](https://github.com/plone/volto/issues/5980)
