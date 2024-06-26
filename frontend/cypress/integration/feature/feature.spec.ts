///<reference path="../../global.d.ts" />

describe('feature', () => {
    const randomId = String(Math.random()).split('.')[1];
    const featureToggleName = `unleash-e2e-${randomId}`;
    const projectName = `unleash-e2e-project-${randomId}`;

    const variant1 = 'variant1';
    const variant2 = 'variant2';

    before(() => {
        cy.runBefore();
        cy.login_UI();
        cy.createProject_API(projectName);
    });

    after(() => {
        cy.deleteFeature_API(featureToggleName, projectName);
        cy.deleteProject_API(projectName);
    });

    beforeEach(() => {
        cy.login_UI();
        cy.visit('/features');
    });

    it('can create a feature toggle', () => {
        cy.createFeature_UI(featureToggleName, true, projectName);
        cy.url().should('include', featureToggleName);
    });

    it('gives an error if a toggle exists with the same name', () => {
        cy.createFeature_UI(featureToggleName, false, projectName);
        cy.get("[data-testid='INPUT_ERROR_TEXT']").contains(
            'A toggle with that name already exists',
        );
    });

    it('gives an error if a toggle name is url unsafe', () => {
        cy.createFeature_UI('featureToggleUnsafe####$#//', false, projectName);
        cy.get("[data-testid='INPUT_ERROR_TEXT']").contains(
            `"name" must be URL friendly`,
        );
    });

    it('can add, update and delete a gradual rollout strategy to the development environment', () => {
        cy.addFlexibleRolloutStrategyToFeature_UI({
            featureToggleName,
            project: projectName,
        }).then(() => {
            cy.updateFlexibleRolloutStrategy_UI(
                featureToggleName,
                projectName,
            ).then(() =>
                cy.deleteFeatureStrategy_UI(
                    featureToggleName,
                    false,
                    projectName,
                ),
            );
        });
    });
});
