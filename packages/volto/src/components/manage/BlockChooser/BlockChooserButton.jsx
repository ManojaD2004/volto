import React from 'react';
import doesNodeContainClick from 'semantic-ui-react/dist/commonjs/lib/doesNodeContainClick';
import addSVG from '@plone/volto/icons/circle-plus.svg';
import { blockHasValue } from '@plone/volto/helpers/Blocks/Blocks';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import BlockChooser from '@plone/volto/components/manage/BlockChooser/BlockChooser';
import config from '@plone/volto/registry';
import { Button, Ref } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { usePopper } from 'react-popper';
import { createPortal } from 'react-dom';

const messages = defineMessages({
  addBlock: {
    id: 'Add block',
    defaultMessage: 'Add block',
  },
});

export const ButtonComponent = (props) => {
  const intl = useIntl();
  const {
    className = `block-add-button${
      config.experimental.addBlockButton.enabled ? ' new-add-block' : ''
    }`,
    size = '19px',
    onShowBlockChooser,
  } = props;

  return (
    <Button
      type="button"
      icon
      basic
      title={intl.formatMessage(messages.addBlock)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onShowBlockChooser();
      }}
      className={className}
    >
      <Icon name={addSVG} className={className} size={size} />
    </Button>
  );
};

const BlockChooserButton = (props) => {
  const {
    block,
    allowedBlocks,
    showRestricted,
    data,
    onMutateBlock,
    onInsertBlock,
    blocksConfig,
    buttonComponent,
    properties,
    navRoot,
    contentType,
  } = props;

  const { disableNewBlocks } = data;
  const [addNewBlockOpened, setAddNewBlockOpened] = React.useState(false);

  const blockChooserRef = React.useRef();

  const handleClickOutside = React.useCallback((e) => {
    if (
      blockChooserRef.current &&
      doesNodeContainClick(blockChooserRef.current, e)
    )
      return;
    setAddNewBlockOpened(false);
  }, []);

  const Component = buttonComponent || ButtonComponent;

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, false);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  }, [handleClickOutside]);

  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: config.experimental.addBlockButton.enabled
      ? 'bottom'
      : 'right-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [-10, 5],
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: config.experimental.addBlockButton.enabled
            ? ['bottom-start', 'bottom-end']
            : ['right-end', 'top-start'],
        },
      },
    ],
  });

  return (
    <>
      {!disableNewBlocks &&
        (config.experimental.addBlockButton.enabled ||
          !blockHasValue(data)) && (
          <Ref innerRef={setReferenceElement}>
            <Component
              {...props}
              onShowBlockChooser={() => setAddNewBlockOpened(true)}
            />
          </Ref>
        )}
      {addNewBlockOpened &&
        createPortal(
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <BlockChooser
              onMutateBlock={
                onMutateBlock
                  ? (id, value) => {
                      setAddNewBlockOpened(false);
                      onMutateBlock(id, value);
                    }
                  : null
              }
              onInsertBlock={
                onInsertBlock
                  ? (id, value) => {
                      setAddNewBlockOpened(false);
                      onInsertBlock(id, value);
                    }
                  : null
              }
              currentBlock={block}
              allowedBlocks={allowedBlocks}
              blocksConfig={blocksConfig}
              properties={properties}
              showRestricted={showRestricted}
              ref={blockChooserRef}
              navRoot={navRoot}
              contentType={contentType}
            />
          </div>,
          document.body,
        )}
    </>
  );
};

export default BlockChooserButton;
