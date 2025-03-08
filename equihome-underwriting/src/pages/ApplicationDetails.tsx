import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUnderwritingStore } from '../store/underwritingStore';
import { toast } from 'react-hot-toast';
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  TrashIcon,
  PaperClipIcon,
} from '@heroicons/react/24/outline';
import type { ApplicationStatus, MarketCondition } from '../types/underwriting';
import { AutomatedUnderwritingService } from '../services/automatedUnderwriting';

const getStatusIcon = (status: ApplicationStatus) => {
  switch (status) {
    case 'approved':
      return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
    case 'rejected':
      return <XCircleIcon className="h-6 w-6 text-red-500" />;
    case 'in-review':
      return <DocumentTextIcon className="h-6 w-6 text-blue-500" />;
    default:
      return <ClockIcon className="h-6 w-6 text-yellow-500" />;
  }
};

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

export default function ApplicationDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentApplication, fetchApplication, approveApplication, rejectApplication, requestMoreInfo, addNote, deleteNote, uploadDocument, deleteDocument } = useUnderwritingStore();
  const [isLoading, setIsLoading] = useState(false);
  const [note, setNote] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('');
  const [evaluation, setEvaluation] = useState<{
    overall: MarketCondition;
    property: MarketCondition;
    financial: MarketCondition;
    borrower: MarketCondition;
    marketCondition: MarketCondition;
    recommendations: string[];
  } | null>(null);

  useEffect(() => {
    if (id) {
      fetchApplication(id);
    }
  }, [id, fetchApplication]);

  useEffect(() => {
    const evaluateApplication = async () => {
      if (currentApplication) {
        const underwritingService = new AutomatedUnderwritingService();
        const result = await underwritingService.evaluateApplication(currentApplication);
        setEvaluation(result);
      }
    };
    evaluateApplication();
  }, [currentApplication]);

  const handleApprove = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      await approveApplication(id);
      toast.success('Application approved successfully');
    } catch (error) {
      toast.error('Failed to approve application');
      console.error('Error approving application:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      await rejectApplication(id, 'Application does not meet underwriting criteria');
      toast.success('Application rejected successfully');
    } catch (error) {
      toast.error('Failed to reject application');
      console.error('Error rejecting application:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !note.trim()) return;

    try {
      setIsLoading(true);
      await addNote(id, { text: note });
      setNote('');
      toast.success('Note added successfully');
    } catch (error) {
      toast.error('Failed to add note');
      console.error('Error adding note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!id) return;
    try {
      setIsLoading(true);
      await deleteNote(id, noteId);
      toast.success('Note deleted successfully');
    } catch (error) {
      toast.error('Failed to delete note');
      console.error('Error deleting note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !selectedFile || !documentType) return;

    try {
      setIsLoading(true);
      await uploadDocument(id, selectedFile, documentType);
      setSelectedFile(null);
      setDocumentType('');
      toast.success('Document uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload document');
      console.error('Error uploading document:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    if (!id) return;
    try {
      setIsLoading(true);
      await deleteDocument(id, documentId);
      toast.success('Document deleted successfully');
    } catch (error) {
      toast.error('Failed to delete document');
      console.error('Error deleting document:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentApplication) {
    return (
      <div className="text-center py-12">
        <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">Loading application...</h3>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Application Details
            </h2>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <button
              type="button"
              onClick={() => navigate('/applications')}
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Back to Applications
            </button>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:items-center">
                {getStatusIcon(currentApplication.status)}
                <div className="mt-3 sm:ml-4 sm:mt-0">
                  <div className="text-sm font-medium text-gray-500">Application Status</div>
                  <div className="mt-1 text-sm text-gray-900">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getStatusClasses(
                        currentApplication.status
                      )}`}
                    >
                      {currentApplication.status === 'in-review'
                        ? 'In Review'
                        : currentApplication.status.charAt(0).toUpperCase() + currentApplication.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3 sm:ml-4 sm:mt-0">
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handleApprove}
                    disabled={isLoading || currentApplication.status === 'approved'}
                    className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={handleReject}
                    disabled={isLoading || currentApplication.status === 'rejected'}
                    className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Automated Evaluation */}
        {evaluation && (
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Automated Evaluation</h3>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Overall Assessment</dt>
                    <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        evaluation.overall === 'green' 
                          ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                          : evaluation.overall === 'yellow'
                          ? 'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20'
                          : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'
                      }`}>
                        {evaluation.overall.toUpperCase()}
                      </span>
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Property Assessment</dt>
                    <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        evaluation.property === 'green'
                          ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                          : evaluation.property === 'yellow'
                          ? 'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20'
                          : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'
                      }`}>
                        {evaluation.property.toUpperCase()}
                      </span>
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Financial Assessment</dt>
                    <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        evaluation.financial === 'green'
                          ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                          : evaluation.financial === 'yellow'
                          ? 'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20'
                          : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'
                      }`}>
                        {evaluation.financial.toUpperCase()}
                      </span>
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Borrower Assessment</dt>
                    <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        evaluation.borrower === 'green'
                          ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                          : evaluation.borrower === 'yellow'
                          ? 'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20'
                          : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'
                      }`}>
                        {evaluation.borrower.toUpperCase()}
                      </span>
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Market Condition</dt>
                    <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        evaluation.marketCondition === 'green'
                          ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                          : evaluation.marketCondition === 'yellow'
                          ? 'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20'
                          : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'
                      }`}>
                        {evaluation.marketCondition.toUpperCase()}
                      </span>
                    </dd>
                  </div>
                  {evaluation.recommendations.length > 0 && (
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">Recommendations</dt>
                      <dd className="mt-1 text-sm leading-6 text-red-600 sm:col-span-2 sm:mt-0">
                        <ul className="list-disc pl-5 space-y-1">
                          {evaluation.recommendations.map((recommendation, index) => (
                            <li key={index}>{recommendation}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        )}

        {/* Property Details */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Property Details</h3>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {currentApplication.property.address}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Property Type</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {currentApplication.property.propertyType}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Purchase Price</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    ${currentApplication.property.purchasePrice.toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Financial Details */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Financial Details</h3>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Loan Amount</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    ${currentApplication.financial.loanAmount.toLocaleString()}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Monthly Rent</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    ${currentApplication.financial.monthlyRent.toLocaleString()}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Cap Rate</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {currentApplication.financial.capRate.toFixed(2)}%
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Documents</h3>
            <div className="mt-4">
              <form onSubmit={handleFileUpload} className="flex items-center space-x-4">
                <div>
                  <label htmlFor="document-type" className="sr-only">
                    Document Type
                  </label>
                  <select
                    id="document-type"
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select Type</option>
                    <option value="property-photos">Property Photos</option>
                    <option value="financial-statements">Financial Statements</option>
                    <option value="tax-returns">Tax Returns</option>
                    <option value="bank-statements">Bank Statements</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="file-upload" className="sr-only">
                    Choose file
                  </label>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!selectedFile || !documentType || isLoading}
                  className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50"
                >
                  Upload
                </button>
              </form>

              <ul role="list" className="mt-6 divide-y divide-gray-100">
                {currentApplication.documents.map((document) => (
                  <li key={document.id} className="flex items-center justify-between py-4">
                    <div className="flex min-w-0 gap-x-4">
                      <PaperClipIcon className="h-12 w-12 flex-none text-gray-400" aria-hidden="true" />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{document.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{document.type}</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          Uploaded on {new Date(document.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-x-4">
                      <a
                        href={document.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                      >
                        View
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDeleteDocument(document.id)}
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        <TrashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Notes</h3>
            <div className="mt-4">
              <form onSubmit={handleAddNote}>
                <div>
                  <label htmlFor="note" className="sr-only">
                    Add note
                  </label>
                  <textarea
                    rows={3}
                    name="note"
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder="Add a note..."
                  />
                </div>
                <div className="mt-3">
                  <button
                    type="submit"
                    disabled={!note.trim() || isLoading}
                    className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50"
                  >
                    Add Note
                  </button>
                </div>
              </form>

              <ul role="list" className="mt-6 divide-y divide-gray-100">
                {currentApplication.notes.map((note) => (
                  <li key={note.id} className="flex items-center justify-between gap-x-6 py-5">
                    <div className="min-w-0">
                      <div className="flex items-start gap-x-3">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{note.author}</p>
                        <p className="text-xs leading-5 text-gray-500">
                          {new Date(note.date).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-gray-600">{note.text}</p>
                    </div>
                    <div className="flex flex-none items-center gap-x-4">
                      <button
                        type="button"
                        onClick={() => handleDeleteNote(note.id)}
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        <TrashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 