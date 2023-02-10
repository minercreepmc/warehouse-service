import {
  AdminPasswordValueObject,
  AdminUsernameValueObject,
} from '@admin-value-object';
import { AbstractEntity, ID } from 'common-base-classes';

/**
 * Interface for the details of an AdminEntity
 */
export interface AdminEntityDetails {
  /** The username of the admin */
  username: AdminUsernameValueObject;
  /** The password of the admin */
  password: AdminPasswordValueObject;
}

/**
 * Enum for the possible states of an AdminEntity
 */
export enum AdminState {
  /** The admin is active */
  ACTIVE,
  /** The admin is inactive */
  INACTIVE,
  /** The admin is deleted */
  DELETED,
}

/**
 * Class representing an AdminEntity
 */
export class AdminEntity extends AbstractEntity<AdminEntityDetails> {
  /** The state of the admin */
  private state: AdminState;

  /**
   * Creates an instance of AdminEntity.
   * @param id The id of the admin
   * @param details The details of the admin
   */
  constructor(id: ID, details: AdminEntityDetails) {
    super({
      id,
      details,
    });

    this.state = AdminState.ACTIVE;
  }

  /**
   * Deactivates the admin
   */
  deactivate() {
    if (this.state === AdminState.ACTIVE) {
      this.state = AdminState.INACTIVE;
    }
  }

  /**
   * Reactivates the admin
   */
  reactivate() {
    if (this.state === AdminState.INACTIVE) {
      this.state = AdminState.ACTIVE;
    }
  }

  /**
   * Deletes the admin
   */
  delete() {
    if (this.state === AdminState.DELETED) {
      this.state = AdminState.DELETED;
    }
  }

  /**
   * Gets the state of the admin
   * @returns The state of the admin
   */
  getState(): AdminState {
    return this.state;
  }
}
