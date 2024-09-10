import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  findFirstCategoryLink,
  useDocById,
} from '@docusaurus/theme-common/internal';
import isInternalUrl from '@docusaurus/isInternalUrl';
import {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';
function CardContainer({href, children}) {
  return (
    <Link
      href={href}
      className={clsx('card padding--lg', styles.cardContainer)}>
      {children}
    </Link>
  );
}
function CardLayout({href, icon, title, description}) {
  return (
    <CardContainer href={href}>
      <h2 className={clsx('text--truncate', styles.cardTitle)} title={title}>
        {icon} {title}
      </h2>
      {description && (
        <p
          className={clsx('text--truncate', styles.cardDescription)}
          title={description}>
          {description}
        </p>
      )}
    </CardContainer>
  );
}
function CardCategory({item}) {
  const href = findFirstCategoryLink(item);
  if (!href) {
    return null;
  }
  return (
    <CardLayout
      href={href}
      icon="🗃️"
      title={item.label}
      description={
        item.description ??
        translate(
          {
            message: '{count} items',
            id: 'theme.docs.DocCard.categoryDescription',
            description:
              'The default description for a category card in the generated index about how many items this category includes',
          },
          {count: item.items.length},
        )
      }
    />
  );
}
function CardLink({ item }) {
    const isUrl = (str) => {
        try {
            new URL(str);
            return true;
        } catch {
            return false;
        }
    };

    const isLocalImage = (str) => {
        return str && str.startsWith('img:');
    };

    const isSvg = (str) => {
        return str && (str.endsWith('.svg') || str.includes('.svg?'));
    };

    const getIconElement = () => {
        const myEmoji = item?.customProps?.myEmoji;

        if (isLocalImage(myEmoji)) {
            const localImagePath = myEmoji.replace('img:', '');
            return <img src={localImagePath} alt={item.label} style={{ width: '17px', height: '17px' }} />;
        } else if (isSvg(myEmoji)) {
            return <img
                src={myEmoji}
                alt={item.label}
                style={{width: '18px', height: '18px'}}
                className="svg-icon"
            />
        } else if (isUrl(myEmoji)) {
            return <img src={myEmoji} alt={item.label} style={{ width: '24px', height: '24px' }} />;
        } else {
            return isInternalUrl(item.href) ? '📄️' : '🔗';
        }
    };

    const icon = getIconElement();
    const doc = useDocById(item.docId ?? undefined);

    return (
        <CardLayout
            href={item.href}
            icon={icon}
            title={item.label}
            description={item.description ?? doc?.description}
        />
    );
}




export default function DocCard({item}) {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
