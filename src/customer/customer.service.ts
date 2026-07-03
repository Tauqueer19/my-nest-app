import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  private customers: Customer[] = [];

  // GET all
  getAllCustomers(): Customer[] {
    return this.customers;
  }

  // POST
  addCustomers(createCustomerDto: CreateCustomerDto): Customer {
    const newCustomer: Customer = {
      id: Date.now(),
      ...createCustomerDto,
    };

    this.customers.push(newCustomer);
    return newCustomer;
  }

  // PATCH (update)
  updateCustomer(
    id: string,
    updateData: Partial<CreateCustomerDto>,
  ): Customer {
    const customerIndex = this.customers.findIndex(
      (c) => c.id === Number(id),
    );

    if (customerIndex === -1) {
      throw new NotFoundException('Customer not found');
    }

    // merge old + new data
    this.customers[customerIndex] = {
      ...this.customers[customerIndex],
      ...updateData,
    };

    return this.customers[customerIndex];
  }

  // DELETE
  deleteCustomer(id: string): { message: string } {
    const customerIndex = this.customers.findIndex(
      (c) => c.id === Number(id),
    );

    if (customerIndex === -1) {
      throw new NotFoundException('Customer not found');
    }

    this.customers.splice(customerIndex, 1);

    return { message: 'Customer deleted successfully' };
  }
}