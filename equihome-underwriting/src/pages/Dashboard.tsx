import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  DocumentCheckIcon,
  XMarkIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline';
import { useUnderwritingStore } from '../store/underwritingStore';
import type { ApplicationStatus } from '../types/underwriting';

const stats = [
  {
    name: 'Total Applications',
    stat: '0',
    icon: DocumentIcon,
    change: '12%',
    changeType: 'increase',
  },
  {
    name: 'Approved Applications',
    stat: '0',
    icon: DocumentCheckIcon,
    change: '2.1%',
    changeType: 'increase',
  },
  {
    name: 'Rejected Applications',
    stat: '0',
    icon: XMarkIcon,
    change: '4.3%',
    changeType: 'decrease',
  },
  {
    name: 'Average Processing Time',
    stat: '0',
    icon: ClockIcon,
    change: '11.3%',
    changeType: 'decrease',
    suffix: ' days',
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const getStatusClasses = (status: ApplicationStatus): string => {
  switch (status) {
    case 'approved':
      return 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20';
    case 'rejected':
      return 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20';
    case 'pending':
      return 'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20';
    case 'in-review':
      return 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20';
    default:
      return '';
  }
};

export default function Dashboard() {
  const { applications, dashboardStats, fetchApplications, fetchDashboardStats } = useUnderwritingStore();

  useEffect(() => {
    fetchApplications();
    fetchDashboardStats();
  }, [fetchApplications, fetchDashboardStats]);

  const updatedStats = stats.map((item) => {
    if (!dashboardStats) return item;

    let value = '0';
    switch (item.name) {
      case 'Total Applications':
        value = dashboardStats.totalApplications.toString();
        break;
      case 'Approved Applications':
        value = dashboardStats.approvedApplications.toString();
        break;
      case 'Rejected Applications':
        value = dashboardStats.rejectedApplications.toString();
        break;
      case 'Average Processing Time':
        value = dashboardStats.averageProcessingTime.toFixed(1);
        break;
    }

    return {
      ...item,
      stat: value,
    };
  });

  return (
    <div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-8 lg:grid-cols-2">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Dashboard Overview</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Real-time metrics and performance indicators for the underwriting process.
          </p>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {updatedStats.map((item) => (
          <div key={item.name} className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
            <dt>
              <div className="absolute rounded-md bg-gray-900 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}{item.suffix || ''}</p>
              <p
                className={classNames(
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                ) : (
                  <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                )}
                <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-16">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Recent Applications</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              A list of recent underwriting applications and their current status.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link
              to="/applications/new"
              className="block rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              New Application
            </Link>
          </div>
        </div>

        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Property
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Borrower
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Loan Amount
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Submission Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {applications.slice(0, 5).map((application) => (
                    <tr key={application.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        <Link to={`/applications/${application.id}`} className="hover:text-gray-600">
                          {application.property.address}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {application.borrower.firstName} {application.borrower.lastName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        ${application.financial.loanAmount.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span
                          className={classNames(
                            getStatusClasses(application.status),
                            'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium'
                          )}
                        >
                          {application.status === 'in-review' ? 'In Review' : application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(application.submissionDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 