import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Utils
import routes from '../../routes';
import { storage } from '../../utils/storage';
import { wrapWithRouter } from '../../testHelpers';
// Components
import { LinksGroup } from './LinksGroup';

const stateKey = 'foobar';

describe('LinksGroup', () => {
  describe('on mount', () => {
    it('should display label and content #smoke', () => {
      // Arrange
      render(
        wrapWithRouter(
          <LinksGroup label="Links" to="#" icon={<span>icon</span>} defaultOpen>
            Content
          </LinksGroup>,
          { route: routes.homePath() },
        ),
      );

      // Assert
      expect(screen.getByText(/links/i)).toBeInTheDocument();
      expect(screen.getByText(/content/i)).toBeInTheDocument();
      expect(screen.getByText(/icon/i)).toBeInTheDocument();
    });
  });

  describe('when links are set', () => {
    it('should display links', async () => {
      // Arrange
      const user = userEvent.setup();
      const links = [
        { label: 'foo', link: '#' },
        { label: 'bar', link: '#' },
      ];
      const linkLabels = links.map((l) => l.label);
      render(
        wrapWithRouter(<LinksGroup label="Links" to="#" links={links} />, {
          route: routes.homePath(),
        }),
      );

      // Act
      await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /links/i }));
      const linkElements = screen.getAllByRole<HTMLAnchorElement>('link');
      const linkElementLabels = linkElements.map((l) => l.textContent);

      // Assert
      expect(linkElementLabels).to.have.members(linkLabels);
    });
  });

  describe('when "preserveStateKey" attribute is set', () => {
    beforeEach(() => {
      storage.removeItem(stateKey);
    });

    it('should save state on rerender', async () => {
      // Arrange
      const user = userEvent.setup();
      render(
        wrapWithRouter(
          <LinksGroup label="Links" to="#" preserveStateKey={stateKey}>
            Content
          </LinksGroup>,
          {
            route: routes.homePath(),
          },
        ),
      );

      // Assert (links group is closed)
      expect(screen.queryByText(/content/i)).not.toBeInTheDocument();

      // Act (open links group)
      await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /links/i }));

      // Assert (links group is opened)
      expect(screen.queryByText(/content/i)).toBeInTheDocument();
    });
  });
});
